import json
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Type

# Define the request handler class by extending BaseHTTPRequestHandler.
# This class will handle HTTP requests that the server receives.
class SimpleRequestHandler(BaseHTTPRequestHandler):    
    users = [{
        "id": 1,
        "firstName": "John",
        "lastName": "Smith",
        "role": "Manager"
    }]

    next_id = 2

    # Handle OPTIONS requests (used in CORS preflight checks).
    # CORS (Cross-Origin Resource Sharing) is a mechanism that allows restricted resources
    # on a web page to be requested from another domain outside the domain from which the resource originated.
    def do_OPTIONS(self):
        # Send a 200 OK response to acknowledge the request was processed successfully.
        self.send_response(200, "OK")

        # Set headers to indicate that this server allows any origin (*) to access its resources.
        # This is important for browsers when making cross-origin requests.
        self.send_header("Access-Control-Allow-Origin", "*")

        # Specify the allowed HTTP methods that can be used in the actual request.
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

        # Indicate what request headers are allowed (e.g., Content-Type for JSON requests).
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

        # End headers and complete the response
        self.end_headers()

    # Handle GET requests.
    # When the client sends a GET request, this method will be called.
    def do_GET(self) -> None:
        # Set the HTTP response status to 200 OK, which means the request was successful.
        self.send_response(200)
        # Set the Content-Type header to application/json, meaning the response will be in JSON format.
        self.send_header('Content-type', 'application/json')
        # Allow any domain to make requests to this server (CORS header).
        self.send_header('Access-Control-Allow-Origin', '*')
        # Finish sending headers
        self.end_headers()
        # Convert the users list to a JSON string and send it back to the client.
        # `self.wfile.write()` is used to send the response body.
        self.wfile.write(json.dumps(self.users).encode())
        
        

    # Handle POST requests.
    # This method is called when the client sends a POST request.
    def do_POST(self) -> None:
        # Retrieve the content length from the request headers.
        # This tells us how much data to read from the request body.
        content_length: int = int(self.headers['Content-Length'])
        # Read the request body based on the content length.
        post_data: bytes = self.rfile.read(content_length)
        # Decode the received byte data and parse it as JSON.
        # We expect the POST request body to contain JSON-formatted data.
        received_data: dict = json.loads(post_data.decode())
        
        received_data["id"] = self.__class__.user_id
        self.__class__.user_id = self.__class__.user_id + 1

        self.users.append(received_data)

        resposne: dict = {
            "message": "User added successfully",
            "updated_list": self.users
        }

        # Send the response headers.
        # Set the status to 200 OK and indicate the response content will be in JSON format.
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        # Again, allow any origin to access this resource (CORS header).
        self.send_header('Access-Control-Allow-Origin', '*')
        # Finish sending headers.
        self.end_headers()
        # Convert the users dictionary to a JSON string and send it back to the client.
        self.wfile.write(json.dumps(resposne).encode())
        

    def do_DELETE(self):
        try:
            #Extract item id from URL
            user_id = int(self.path.split("/")[-1])
            #Select item to delete
            user_to_delete = next((user for user in self.users if user['id'] == user_id), None)

            if user_to_delete:
                self.users.remove(user_to_delete)

                # send response with updated list
                response = {
                    "message": f"User deleted successfully. User Id: {user_id}",
                    "deleted_item": user_to_delete,
                    "updated_list": self.users
                }
                self.send_response(200)
            else:
                response = {
                    "message": f"User with id {user_id} not found.",
                    "courent_list": self.users
                }
                self.send_response(404)
                
        except (IndexError, ValueError):
            response = {
                "message": "Invalid user_id. Deletion failed.",
                "courent_list": self.users
            }
            self.send_response(400)

        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())

# Function to start the server.
# It takes parameters to specify the server class, handler class, and port number.
def run(
        server_class: Type[HTTPServer] = HTTPServer,
        handler_class: Type[BaseHTTPRequestHandler] = SimpleRequestHandler,
        port: int = 8000
) -> None:
    # Define the server address.
    # '' means it will bind to all available network interfaces on the machine, and the port is specified.
    server_address: tuple = ('', port)

    # Create an instance of HTTPServer with the specified server address and request handler.
    httpd: HTTPServer = server_class(server_address, handler_class)

    # Print a message to the console indicating that the server is starting and which port it will listen on.
    print(f"Starting HTTP server on port {port}...")

    # Start the server and make it continuously listen for requests.
    # This method will block the program and keep running until interrupted.
    httpd.serve_forever()

# If this script is executed directly (not imported as a module), this block runs.
# It calls the `run()` function to start the server.
if __name__ == '__main__':
    run()
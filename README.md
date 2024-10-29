# Opis projektu

Ten projekt to prosta aplikacja webowa umożliwiająca dodawanie, wyświetlanie oraz usuwanie użytkowników za pomocą interfejsu formularza. Aplikacja składa się z:

- **Front-endu**: pliki HTML, CSS i JavaScript obsługujące interfejs użytkownika.
- **Back-endu**: prostego serwera HTTP napisanego w Pythonie, który obsługuje żądania GET, POST i DELETE.

## Wymagania

- **Python 3.x**
- Przeglądarka internetowa (np. Chrome, Firefox)

## Użytkowanie aplikacji

### Dodawanie użytkownika:

1. Wypełnij formularz, podając imię, nazwisko oraz wybierając rolę z listy.
2. Zaznacz pole akceptacji polityki prywatności.
3. Kliknij przycisk **SUBMIT**.
4. Nowy użytkownik pojawi się na liście poniżej formularza.

### Usuwanie użytkownika:

- Kliknij ikonę kosza obok użytkownika, którego chcesz usunąć.
- Użytkownik zostanie usunięty z listy.

## Struktura plików

- **`index.html`**: Strona główna z formularzem i miejscem na listę użytkowników.
- **`style.css`**: Arkusz stylów definiujący wygląd aplikacji.
- **`requests_async.js`**: Skrypt JavaScript obsługujący komunikację z serwerem i interakcje użytkownika.
- **`server.py`**: Serwer HTTP w Pythonie obsługujący żądania GET, POST i DELETE.

## Ważne informacje

- **CORS**: Serwer jest skonfigurowany tak, aby akceptować żądania z dowolnego pochodzenia (`Access-Control-Allow-Origin: *`).
- **Trwałość danych**: Dane użytkowników są przechowywane w pamięci serwera i zostaną utracone po jego wyłączeniu.
- **Porty**: Domyślnie aplikacja korzysta z portów `8000` (back-end) i `8080` (front-end).

## Uwagi

- Upewnij się, że skrypty są poprawnie dołączone w pliku `index.html` i że ścieżki do plików są prawidłowe.
- Jeśli napotkasz problemy z CORS, uruchom aplikację przez serwer HTTP zamiast otwierać plik HTML bezpośrednio.

$(document).ready(function () {
    const API_KEY = '706cdbb424a42e91960355cdef068888';
    var MainWeather;
    var bgChange;
    const targetCities = ["Bolesławiec", "Kołobrzeg", "Wrocław", "Warszawa", "Karpacz"];

    // Funkcja do pobierania pogody dla konkretnego miasta
    function displayWeatherData(data) {
        $('#cityName').text(data.name);
        $('#temperature').text(data.main.temp);
        $('#humidity').text(data.main.humidity);
        $('#pressure').text(data.main.pressure);
        $('#windSpeed').text(data.wind.speed);
        $('#weatherIcon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        MainWeather = data.weather[0].main;

        if (MainWeather === "Rain" || MainWeather === "Drizzle") {
            bgChange = 'assets/1.png';
        } else if (MainWeather === "Thunderstorm") {
            bgChange = 'assets/3.png';
        } else if (MainWeather === "Snow") {
            bgChange = 'assets/5.png';
        } else if (MainWeather === "Clear") {
            bgChange = 'assets/6.png';
        } else if (MainWeather === "Clouds") {
            bgChange = 'assets/2.png';
        } else {
            bgChange = 'assets/4.png';
        }
        $('.bg-image').css({ 'backgroundImage': `url(${bgChange})` });

    }
    function getWeather(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                $('#cityName').text(data.name);
                $('#temperature').text(data.main.temp);
                $('#humidity').text(data.main.humidity);
                $('#pressure').text(data.main.pressure);
                $('#windSpeed').text(data.wind.speed);
                $('#weatherIcon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
                MainWeather = data.weather[0].main;

                //Zmiana tła strony dopasowanego do pogody w danym mieście
                if (MainWeather === "Rain" || MainWeather === "Drizzle") {
                    bgChange = 'assets/1.png';
                } else if (MainWeather === "Thunderstorm") {
                    bgChange = 'assets/3.png';
                } else if (MainWeather === "Snow") {
                    bgChange = 'assets/5.png';
                } else if (MainWeather === "Clear") {
                    bgChange = 'assets/6.png';
                } else if (MainWeather === "Clouds") {
                    bgChange = 'assets/2.png';
                } else {
                    bgChange = 'assets/4.png';
                }
                $('.bg-image').css({ 'backgroundImage': `url(${bgChange})` });

                // Zapisanie pogody do localStorage tylko dla wybranych miast
                if (targetCities.includes(city)) {
                    localStorage.setItem(city, JSON.stringify(data));
                }

                
            },
            error: function (error) {
                tryToLoadFromLocalStorage(city);
                function tryToLoadFromLocalStorage(city) {
                    const storedData = localStorage.getItem(city);
                    if (storedData) {
                        const parsedData = JSON.parse(storedData);
                        displayWeatherData(parsedData);
                    } else {
                        console.log('Wystąpił błąd: ', error);
                        alert('Nie można pobrać informacji o pogodzie dla podanego miasta.');
                    }
                }
            }
        });
    }

   

    //Wyświetlanie defaultowo miasta Bolesławiec
    getWeather('Bolesławiec');

    // Obsługa kliknięcia przycisku "Sprawdź pogodę"
    $('#getWeatherBtn').click(function () {
        const city = $('#cityInput').val();
        getWeather(city);
    });

    // Obsługa kliknięcia przycisku z nazwą miasta z listy zapisanych miast
    $('.savedCityBtn').click(function () {
        const city = $(this).data('city');
        getWeather(city);
    });
});
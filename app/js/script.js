function showTrackInfo() {
    let visionInfo = document.getElementsByClassName('vision-info');

    for (let i = 0; i < visionInfo.length; i++) {
        visionInfo[i].addEventListener('click', function () {
            let sibling = this.nextElementSibling;
            let plus = this.getElementsByClassName('fa-plus')[0];
            let minus = this.getElementsByClassName('fa-minus')[0];
            let otherPluses = document.getElementsByClassName('fa-plus');
            let otherMinuses = document.getElementsByClassName('fa-minus');

            // while block open
            if(sibling.classList.contains('show-block')) {
                sibling.classList.toggle('show-block');
                plus.classList.remove('hide-sign');
                minus.classList.add('hide-sign');

                for (let k = 0; k < visionInfo.length; k++) {
                    otherPluses[k].classList.remove('hide-sign');
                    otherMinuses[k].classList.add('hide-sign');
                }
            }
            //while block close
            else {
                for (let j = 0; j < visionInfo.length; j++) {
                    visionInfo[j].nextElementSibling.classList.remove('show-block');
                    otherPluses[j].classList.remove('hide-sign');
                    otherMinuses[j].classList.add('hide-sign');
                }
                sibling.classList.toggle('show-block');
                plus.classList.add('hide-sign');
                minus.classList.remove('hide-sign');
            }
        });
    }
}
showTrackInfo();

function searchSong() {
    let enterTrackContainer = document.getElementsByClassName('enter-track-container')[0];
    let body = document.getElementsByTagName('body');
    let searchBtn = document.getElementById('searchBtn');
    let searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', function () {
        let xhr = new XMLHttpRequest();
        let searchVal = searchInput.value;
        let RegExp = /\s/g;

        searchVal = searchVal.replace(RegExp, "+");

        // xhr.open('GET', 'https://itunes.apple.com/search?term=' + searchVal + "'");
        xhr.open('GET', `https://itunes.apple.com/search?term=${searchVal}`);

        xhr.onload = function() {
            let response = this.responseText;
            let obj = JSON.parse(response);
            /*for handlebars*/
            let source   = document.getElementById("track-block").innerHTML;
            let template = Handlebars.compile(source);
            let data = obj;

            Handlebars.registerHelper('getTime', function (time) {
                let min = Math.floor((time/1000/60) << 0),
                    sec = Math.floor((time/1000) % 60);

                return (min + ':' + (sec < 10 ? '0' : '') + sec);
            });
            enterTrackContainer.innerHTML = template(data);
            showTrackInfo();
        };

        xhr.onerror = function() {
            console.log( 'Ошибка ' + this.status );
        };

        xhr.send();
    });
}
searchSong();

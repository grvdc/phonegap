        app.service('IonicClosePopupService', [
            function () {
                var currentPopup;
                var htmlEl = angular.element(document.querySelector('html'));
                htmlEl.on('click', function (event) {
                    if (event.target.nodeName === 'HTML') {
                        if (currentPopup) {
                            currentPopup.close();
                        }
                    }
                });

                this.register = function (popup) {
                    currentPopup = popup;
                }
            }
        ]);

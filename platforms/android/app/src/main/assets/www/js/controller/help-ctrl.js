app.controller('helpCtrl', function($scope,HelpService,$ionicModal) {

    $scope.helpSearch = "";


    HelpService.getHelpData().success(function(data){
       $scope.helpList = data.questions;
    })

    $scope.toggleHelp = function(group) {
        group.show = !group.show;
    };
    $scope.isHelpShown = function(group) {
        return group.show;
    };

    $scope.openHelpDefModel = function() {
        $ionicModal.fromTemplateUrl('templates/help-def-model.html',  {
            scope: $scope,
            animation: 'slide-in-left',//'slide-left-right', 'slide-in-up', 'slide-right-left'
            focusFirstInput: true
            //backdropClickToClose: false
          }).then(function (modal) {
            $scope.contractTypeModal = modal;
            $scope.openContractTypeModal();
          });
      }

      $scope.openContractTypeModal = function() {
        $scope.contractTypeModal.show();
      };

      $scope.closeContractTypeModal = function() {
        $scope.contractTypeModal.hide();
      };



      $scope.searchITM = function() {
    var searchtext = document.getElementById("helpSearch").value;
    var list = document.getElementsByClassName("help_question");
    var newelementAarray = [];
    for(i =0;i<list.length;i++){

      var str1 = list[i].innerHTML
      var regEx = new RegExp("<mark>", "ig");
      var replaceMask = "";
      var content = str1.replace(regEx, replaceMask);

      var regEx = new RegExp("</mark>", "ig");
      var replaceMask = "";
      var content = content.replace(regEx, replaceMask);


      list[i].innerHTML =content;

      var str = list[i].innerText;
      var result= str.search(new RegExp(searchtext, "i"));
         if(result > -1){
          if(searchtext){
          var str3 = list[i].innerHTML
          var regEx = new RegExp(searchtext, "ig");
          list[i].innerHTML = str3.replace(regEx, (match) => `<mark>${match}</mark>`);

          }
        }

    }


      }

});

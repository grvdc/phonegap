/**
 * Created by vpatel on 7/4/2016.
 */
app.controller('areaAssignmentCtrl', function($scope,$state,AuthenticationService,AreaService,projectAreas,$stateParams,$ionicPopup,IonicClosePopupService,$ionicModal) {


if(projectAreas != null && projectAreas.length >0){
  console.log(projectAreas)
  $scope.areaList =[];
  $scope.areaListFinal=[];
  projectAreas.forEach(function(entry) {
  if(entry.isActive =='true'){
    entry.isActive = true;
  }else{
   entry.isActive = false;
  }

  if(entry.isDefault =='true'){
    entry.isDefault = true;
  }else{
   entry.isDefault = false;
  }

  if(entry.internal =='1'){
    entry.internal = true;
  }else{
   entry.internal = false;
  }


 $scope.areaList.push(entry);
 $scope.areaListFinal.push(entry);



});

}

$scope.searchform = {};
$scope.searchItems =function(){

  var filter = $scope.searchform.searchKey.toUpperCase();

  var ptags = document.getElementById("filter_item_section").getElementsByTagName("label");
  for (i = 0; i < ptags.length; i++) {

   // a = li[i].getElementsByTagName("a")[0];
    txtValue = ptags[i].textContent || ptags[i].innerText.toUpperCase();


    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      ptags[i].closest('.filter_item_row').style.display = "";
    } else {
       ptags[i].closest('.filter_item_row').style.display = "none";
    }
  }


  // console.log($scope.projectlist);
  //  console.log($scope.searchform.searchKey)
  }


$scope.selectItem = function(areaID,status){
console.log(areaID+':'+status)
$scope.areaListNew =[];
$scope.areaList.forEach(function(entry) {
if(entry.id == areaID){
  if(entry.isActive){
  entry.isActive = true;
  }else{
  entry.isActive = false;
  }

}

 $scope.areaListNew.push(entry);

})
 $scope.areaList =  $scope.areaListNew;
 $scope.areaListFinal =  $scope.areaListNew;
//$scope.areaList.areaID['isActive'] = true;
}





$scope.showSelectedItems =  false;
$scope.showSelectedItemsOnlyText = 'View Selected Items Only';
$scope.showSelectedItemsOnly = function(){
$scope.searchform.searchKey = '';
$scope.areaListSelected =[];

if(!$scope.showSelectedItems){
$scope.showSelectedItemsOnlyText = 'View All Items Only';
$scope.showSelectedItems = true;
$scope.areaListFinal.forEach(function(entryitem) {
  console.log(entryitem.id+':'+entryitem.isActive);
  if(entryitem.isActive){
   $scope.areaListSelected.push(entryitem);
  }
 });

 $scope.areaList =  $scope.areaListSelected;
}else{
 $scope.showSelectedItems = false;
 $scope.showSelectedItemsOnlyText = 'View Selected Items Only';
 $scope.areaList =  $scope.areaListFinal;
}




}



$scope.allSelected = false;
$scope.toggleSelectAllText = 'Select All';
$scope.removeSelected = function(){

console.log('removeSelected')
$scope.allSelected = true;
$scope.toggleSelectAll();
}

$scope.toggleSelectAll = function(){
console.log($scope.allSelected);
$scope.areaListNew = [];
if(!$scope.allSelected){
$scope.toggleSelectAllText = 'Un-Select All';
$scope.allSelected = true;

$scope.areaList.forEach(function(entry) {
   entry.isActive = true;

  if(entry.isDefault =='true'){
    entry.isDefault = true;
  }else{
   entry.isDefault = false;
  }

  if(entry.internal =='1'){
    entry.internal = true;
  }else{
   entry.internal = false;
  }


 $scope.areaListNew.push(entry);
 });


}else{
$scope.allSelected = false;
$scope.toggleSelectAllText = 'Select All';
$scope.areaList.forEach(function(entry) {
  entry.isActive = false;

  if(entry.isDefault =='true'){
    entry.isDefault = true;
  }else{
   entry.isDefault = false;
  }

  if(entry.internal =='1'){
    entry.internal = true;
  }else{
   entry.internal = false;
  }


 $scope.areaListNew.push(entry);
 });



}
 $scope.areaList =  $scope.areaListNew;
 $scope.areaListFinal =  $scope.areaListNew;

}


$scope.showItemOption = function(areaID){
$('.area_item_option_box').hide();
$('.filter_item_row').removeClass('selectd_area');
$('.filter_item_row .item').css('border-bottom', '1px solid #efefef');
$('#area_item_'+areaID+' .area_item_option_box').show()
$('#area_item_'+areaID+'.filter_item_row').addClass('selectd_area');
$('#area_item_'+areaID+' .item').css('border-bottom', '0px solid #efefef');

}


$scope.hideItemOption = function(areaID){
$('.area_item_option_box').hide();
$('.filter_item_row').removeClass('selectd_area');
$('.filter_item_row .item').css('border-bottom', '1px solid #efefef');

}


$scope.editArea = function(areaID){
$('#new_area_name_'+areaID).show()
}




  $scope.addArea = function (areaID,isDefault) {
   console.log(isDefault);


    $scope.areaListNew =[];
    $scope.areaList.forEach(function(entry) {
    if(entry.id == areaID){

     entry.isDefault = false;
     entry.areaName = $('#new_area_name_'+areaID).val();

    }

  $scope.areaListNew.push(entry);

})
 $scope.areaList =  $scope.areaListNew;
 $scope.areaListFinal =  $scope.areaListNew;
 $scope.hideItemOption(areaID);
  }







})

"use strict";angular.module("app",["ngRoute","angular-loading-bar","treeControl","pascalprecht.translate","tmh.dynamicLocale","LocalStorageModule","ngSanitize","ui.checkbox","ui.bootstrap","ui.bootstrap.datetimepicker"]),angular.module("app").constant("baseUrl","/"),angular.module("app").constant("ngAuthSettings",{apiServiceBaseUri:"/",clientId:"cinnamon"}),angular.module("app").config(["$routeProvider",function(e){e.when("/login",{controller:"loginController",templateUrl:"views/login.html"}).when("/",{templateUrl:"views/main.html"}).when("/subscribers",{templateUrl:"views/subscribers.html",controller:"SubscribersCtrl"}).when("/subscribers/:id",{templateUrl:"views/subscriber.html",controller:"SubscriberCtrl"}).when("/specialties",{templateUrl:"views/specialties.html",controller:"SpecialtiesCtrl"}).when("/specialties/:id",{templateUrl:"views/specialty.html",controller:"SpecialtyCtrl"}).when("/paymentmethods",{templateUrl:"views/paymentmethods.html",controller:"PaymentMethodsCtrl"}).when("/paymentmethods/:id",{templateUrl:"views/paymentmethod.html",controller:"PaymentMethodCtrl"}).when("/socialsecurityfunds",{templateUrl:"views/socialsecurityfunds.html",controller:"SocialSecurityFundsCtrl"}).when("/socialsecurityfunds/:id",{templateUrl:"views/socialsecurityfund.html",controller:"SocialSecurityFundCtrl"}).when("/calendar",{templateUrl:"views/calendar.html",controller:"CalendarCtrl"}).when("/callqueue",{templateUrl:"views/callqueue.html",controller:"CallQueueCtrl"}).when("/receivecall",{templateUrl:"views/receiveCall.html",controller:"ReceiveCallCtrl"}).when("/users",{templateUrl:"views/users.html",controller:"UsersCtrl"}).when("/users/:id",{templateUrl:"views/user.html",controller:"UserCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("app").config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1}]),angular.module("app").config(["tmhDynamicLocaleProvider",function(e){e.localeLocationPattern("scripts/angular-locale_{{locale}}.js")}]),angular.module("app").run([function(){toastr.options.positionClass="toast-bottom-center",toastr.options.closeButton=!0,toastr.options.timeOut=0,toastr.options.extendedTimeOut=0}]),angular.module("app").config(["$httpProvider",function(e){e.interceptors.push("authInterceptorService")}]),angular.module("app").run(["authService",function(e){e.fillAuthData()}]),angular.module("app").config(["localStorageServiceProvider",function(e){e.setStorageType("sessionStorage")}]),angular.module("app").config(["$translateProvider",function(e){e.translations("en",{Subscribers:"Doctors",Subscriber:"Doctor",Specialties:"Specialties",SubscribersList:"Doctors List",LogIn:"Log In",ChangePassword:"Change Password",UsersManagment:"Users Managment",LogOut:"Log Out",LastName:"Last Name",FirstName:"First Name",Company:"Company",Info:"Profile",Phones:"Phones",Addresses:"Addresses",OtherInfo:"Social",DivertPhones:"Diverted Phones",Area:"Area",Street:"Street",PostalCode:"Postal Code",Number:"Number",Type:"Type",Home:"Home",Work:"Work",Mobile:"Mobile",Fax:"Fax",Floor:"Floor",CallAnswer:"Call Answer",Directions:"Directions",Specialty:"Specialty",Title:"Title",PaymentMethods:"Payment Methods",PaymentMethod:"Payment Method",SocialSecurityFunds:"Social Security Funds",SocialSecurityFund:"Social Security Fund",Monday:"Mon",Tuesday:"Tue",Wednesday:"Wed",Thursday:"Thu",Friday:"Fri",Saturday:"Sat",Sunday:"Sun",Schedule:"Work Schedule",Hour:"Hour",Minute:"Minute"}),e.translations("el",{Subscribers:"Ιατροί",Subscriber:"Ιατρός",Specialties:"Ειδικότητες",SubscribersList:"Αρχείο Ιατρών",LogIn:"Σύνδεση",ChangePassword:"Αλλαγή Κωδικού",UsersManagment:"Διαχείρηση Χρηστών",LogOut:"Αποσύνδεση",LastName:"Επώνυμο",FirstName:"Όνομα",Company:"Εταιρεία",Info:"Στοιχεία",Phones:"Τηλέφωνα",Addresses:"Διευθύνσεις",OtherInfo:"Άλλα Στοιχεία",DivertPhones:"Τηλ. Εκτροπής",Area:"Περιοχή",Street:"Οδός",PostalCode:"ΤΚ",Number:"Αριθμός",Type:"Είδος",Home:"Οικίας",Work:"Εργασίας",Mobile:"Κινητό",Fax:"Φαξ",Floor:"Όροφος",CallAnswer:"Τρόπος Απάντησης",Directions:"Πρόσβαση",Specialty:"Ειδικότητα",Title:"Περιγραφή",PaymentMethods:"Τρόποι Πληρωμής",PaymentMethod:"Τρόπος Πληρωμής",SocialSecurityFunds:"Ασφαλιστικά Ταμεία",SocialSecurityFund:"Ασφαλιστικό Ταμείο",Monday:"Δευ",Tuesday:"Τρι",Wednesday:"Τετ",Thursday:"Πεμ",Friday:"Παρ",Saturday:"Σαβ",Sunday:"Κυρ",Schedule:"Ωράριο Λειτουργίας",Hour:"Ώρα",Minute:"Λεπτά"}),e.preferredLanguage("el"),e.useSanitizeValueStrategy(null)}]),angular.module("app").controller("CalendarCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/subscribers"}).then(function(t){e.subscribers=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSubscriber=t},e.add=function(){r.path("/subscribers/new")},e.edit=function(){e.selectedSubscriber&&r.path("/subscribers/"+e.selectedSubscriber.Id)},e.getSpecialties=function(){t({method:"GET",url:a+"api/specialties/"}).then(function(t){e.specialties=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties(),e.getData()}]),angular.module("app").controller("CallQueueCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){var n=a+"api/callentries/";e.getNewRow=function(){t({method:"GET",url:n+"new"}).then(function(t){e.newRow=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getData=function(){t({method:"GET",url:n}).then(function(t){e.data=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.save=function(){t({method:"POST",url:n,data:e.newRow}).then(function(t){e.newRow=t.data,swal("Success","Call successfully saved.","success"),e.data.push(e.newRow),e.getNewRow()},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getNewRow(),e.getData()}]),angular.module("app").controller("loginController",["$scope","$location","authService","ngAuthSettings",function(e,t,r,a){e.loginData={userName:"",password:"",useRefreshTokens:!1},e.message="",e.login=function(){r.login(e.loginData).then(function(){t.path("/")},function(t){e.message=t.error_description})},e.authExternalProvider=function(t){var r=location.protocol+"//"+location.host+"/authcomplete.html",n=a.apiServiceBaseUri+"api/Account/ExternalLogin?provider="+t+"&response_type=token&client_id="+a.clientId+"&redirect_uri="+r;window.$windowScope=e,window.open(n,"Authenticate Account","location=0,status=0,width=600,height=750")},e.authCompletedCB=function(a){e.$apply(function(){if("False"==a.haslocalaccount)r.logOut(),r.externalAuthData={provider:a.provider,userName:a.external_user_name,externalAccessToken:a.external_access_token},t.path("/associate");else{var n={provider:a.provider,externalAccessToken:a.external_access_token};r.obtainAccessToken(n).then(function(){t.path("/orders")},function(t){e.message=t.error_description})}})}}]),angular.module("app").controller("NavCtrl",["$scope","$translate","authService","$location","localStorageService","tmhDynamicLocale","localeService","$http","baseUrl","$window",function(e,t,r,a,n,s,o,i,u,l){r.fillAuthData(),e.authentication=r.authentication,e.language=o.language,e.changeLanguage=function(e){o.setLocale(e),document.documentElement.setAttribute("lang",e)},e.logOut=function(){r.logOut(),a.path("/")},e.login=function(){r.logOut(),a.path("/login")},e.changePassword=function(){i({method:"PUT",url:u+"api/admin",data:e.user}).then(function(){swal("Success","Password successfully changed.","success"),$("#changeMyPassword").modal("hide")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.print=function(){i.get(u+"api/reports/requests/2000/1/1/2016/12/31/0",{responseType:"arraybuffer"}).success(function(e){var t=new Blob([e],{type:"application/pdf"}),r=URL.createObjectURL(t);l.open(r)}).error(function(e){var t=document.getElementById("pdf");t.data=null,e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})}}]),angular.module("app").controller("PaymentMethodsCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){var n=a+"api/paymentmethods/";e.getData=function(){t({method:"GET",url:n}).then(function(t){e.paymentmethods=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.add=function(){r.path("/paymentmethods/new")},e.edit=function(){e.selectedRow&&r.path("/paymentmethods/"+e.selectedRow.Id)},e.getData()}]),angular.module("app").controller("PaymentMethodCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){var s=a+"api/paymentmethods/";e.getData=function(){"new"===r.id?e.paymentmethod={}:t({method:"GET",url:s+r.id}).then(function(t){e.paymentmethod=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",a=s;e.paymentmethod.Id&&(r="PUT",a=s+e.paymentmethod.Id),t({method:r,url:a,data:e.paymentmethod}).then(function(t){e.paymentmethod=t.data,swal("Success","Payment Method successfully saved.","success"),n.path("/paymentmethods")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.paymentmethod.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Payment Method?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:s+e.paymentmethod.Id}).then(function(){swal("Success","Payment Method successfully deleted.","success"),n.path("/paymentmethods")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("ReceiveCallCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){var s=a+"api/callentries/start/";e.callEntry={},e.subscriber={},e.startCall=function(){e.callEntry.Line&&e.getData()},e.getData=function(){t({method:"GET",url:s+e.callEntry.Line}).then(function(t){e.callEntry=t.data.CallEntry,e.subscriber=t.data.Subscriber},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})}}]),angular.module("app").controller("SocialSecurityFundCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){var s=a+"api/socialsecurityfunds/";e.getData=function(){"new"===r.id?e.item={}:t({method:"GET",url:s+r.id}).then(function(t){e.item=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",a=s;e.item.Id&&(r="PUT",a=s+e.item.Id),t({method:r,url:a,data:e.item}).then(function(t){e.item=t.data,swal("Success","Social Security Fund successfully saved.","success"),n.path("/socialsecurityfunds")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.item.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Social Security Fund?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:s+e.item.Id}).then(function(){swal("Success","Social Security Fund successfully deleted.","success"),n.path("/socialsecurityfunds")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("SocialSecurityFundsCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){var n=a+"api/socialsecurityfunds/";e.getData=function(){t({method:"GET",url:n}).then(function(t){e.items=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.add=function(){r.path("/socialsecurityfunds/new")},e.edit=function(){e.selectedRow&&r.path("/socialsecurityfunds/"+e.selectedRow.Id)},e.getData()}]),angular.module("app").controller("SpecialtiesCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){var n=a+"api/specialties/";e.getData=function(){t({method:"GET",url:n}).then(function(t){e.specialties=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSpecialty=t},e.add=function(){r.path("/specialties/new")},e.edit=function(){e.selectedSpecialty&&r.path("/specialties/"+e.selectedSpecialty.Id)},e.getData()}]),angular.module("app").controller("SpecialtyCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){var s=a+"api/specialties/";e.getData=function(){"new"===r.id?e.specialty={}:t({method:"GET",url:s+r.id}).then(function(t){e.specialty=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",a=s;e.specialty.Id&&(r="PUT",a=s+e.specialty.Id),t({method:r,url:a,data:e.specialty}).then(function(t){e.specialty=t.data,swal("Success","Specialty successfully saved.","success"),n.path("/specialties")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.specialty.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Specialty?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:s+e.specialty.Id}).then(function(){swal("Success","Specialty successfully deleted.","success"),n.path("/specialties")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("SubscriberCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){var s=a+"api/subscribers/";e.getData=function(){t({method:"GET",url:s+r.id}).then(function(t){e.subscriber=t.data,$(".selectpicker").selectpicker("refresh"),e.subscriber.Specialty&&$(".selectpicker").selectpicker("val",e.subscriber.Specialty.Id)},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",a=s;e.subscriber.Id&&(r="PUT",a=s+e.subscriber.Id),t({method:r,url:a,data:e.subscriber}).then(function(t){e.subscriber=t.data,swal("Success","Contact successfully saved.","success"),n.path("/subscribers")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.subscriber.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this contact?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:s+e.subscriber.Id}).then(function(){swal("Success","Subscriber successfully deleted.","success"),n.path("/subscribers")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getSpecialties=function(){t({method:"GET",url:a+"api/specialties/"}).then(function(t){e.specialties=t.data,e.getData()},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties()}]),angular.module("app").controller("SubscribersCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){var n=a+"api/subscribers/";e.getData=function(){t({method:"GET",url:n}).then(function(t){e.subscribers=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSubscriber=t},e.add=function(){r.path("/subscribers/new")},e.edit=function(){e.selectedSubscriber&&r.path("/subscribers/"+e.selectedSubscriber.Id)},e.getSpecialties=function(){t({method:"GET",url:n}).then(function(t){e.specialties=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties(),e.getData()}]),angular.module("app").controller("UserCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,n){e.getRoles=function(){t({method:"GET",url:a+"api/roles/"}).then(function(t){e.roles=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getData=function(){"new"===r.id?(e.isNew=!0,e.user={Roles:[]},e.getRoles()):(e.isNew=!1,t({method:"GET",url:a+"api/users/"+r.id}).then(function(t){e.user=t.data,e.getRoles(),$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")}))},e.save=function(){var r="POST",s=a+"api/users";e.user.Id&&(r="PUT",s=a+"api/users/"+e.user.Id),t({method:r,url:s,data:e.user}).then(function(t){e.user=t.data,swal("Success","Contact successfully saved.","success"),n.path("/users")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.user.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this contact?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/users/"+e.user.Id}).then(function(){swal("Success","Contact successfully deleted.","success"),n.path("/users")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.changePassword=function(){t({method:"POST",url:a+"api/admin",data:e.user}).then(function(){swal("Success","Password successfully changed.","success"),$("#changeUserPassword").modal("hide")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getRoles(),e.getData()}]),angular.module("app").controller("UsersCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/users"}).then(function(t){e.users=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedUser=t},e.add=function(){r.path("/users/new")},e.edit=function(){e.selectedUser&&r.path("/users/"+e.selectedUser.Id)},e.getData()}]),angular.module("app").directive("addresses",["enumService",function(e){return{restrict:"E",scope:{title:"=",addresses:"="},templateUrl:"/views/addresses.html",link:function(t){e.AddressTypes().then(function(e){t.addressTypes=e.data}),t.addAddress=function(){t.addresses.push({})},t.deleteAddress=function(e){var r=t.addresses.indexOf(e,0);r>-1&&t.addresses.splice(r,1)}}}}]),angular.module("app").directive("appointment",["enumService",function(e){return{restrict:"E",scope:{appointment:"="},templateUrl:"/views/appointment.html",link:function(e){}}}]),angular.module("app").directive("appointments",["enumService",function(e){return{restrict:"E",scope:{appointments:"="},templateUrl:"/views/appointments.html",link:function(e){}}}]),angular.module("app").directive("convertToNumber",function(){return{require:"ngModel",link:function(e,t,r,a){a.$parsers.push(function(e){return parseInt(e,10)}),a.$formatters.push(function(e){return""+e})}}}),angular.module("app").directive("faqs",[function(){return{restrict:"E",scope:{title:"=",faqs:"=",locked:"="},templateUrl:"/views/faqs.html",link:function(e){e.addFaq=function(){e.faqs.push({})},e.deleteFaq=function(t){var r=e.faqs.indexOf(t,0);r>-1&&e.faqs.splice(r,1)}}}}]),angular.module("app").directive("formHeader",function(){return{restrict:"E",transclude:!0,replace:!0,scope:{delete:"&?",save:"&?"},templateUrl:"/views/form-header.html",link:function(e){angular.isDefined(e.delete)?e.canDelete=!0:e.canDelete=!1,angular.isDefined(e.save)?e.canSave=!0:e.canSave=!1,$(function(){$('[data-toggle="tooltip"]').tooltip()})}}}),angular.module("app").directive("infos",["enumService",function(e){return{restrict:"E",scope:{title:"=",infos:"="},templateUrl:"/views/infos.html",link:function(t){e.InfoTypes().then(function(e){t.infoTypes=e.data}),t.addInfo=function(){t.infos.push({})},t.deleteInfo=function(e){var r=t.infos.indexOf(e,0);r>-1&&t.infos.splice(r,1)}}}}]),angular.module("app").directive("listHeader",function(){return{restrict:"E",transclude:!0,replace:!0,scope:{search:"=",add:"&?",edit:"&?",save:"&",filter:"&"},templateUrl:"/views/list-header.html",link:function(e){angular.isDefined(e.add)?e.canAdd=!0:e.canAdd=!1,angular.isDefined(e.edit)?e.canEdit=!0:e.canEdit=!1,$(function(){$('[data-toggle="tooltip"]').tooltip()})}}}),angular.module("app").directive("myDateInput",["localeService",function(e){return{restrict:"E",scope:{dateTime:"="},template:'<div class="input-group"><input type="text" class="form-control" datetime-picker="{{language.dateFormat}}" datepicker-options="popup.options" ng-model="dateTime" is-open="popup.opened"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open()"><i class="glyphicon glyphicon-calendar"></i></button></span></div>',link:function(t){t.open=function(){t.popup.opened=!0},t.popup={opened:!1,options:{showWeeks:!1}},t.language=e.language}}}]),angular.module("app").directive("onFinishRender",["$timeout",function(e){return{restrict:"A",link:function(t){t.$last===!0&&e(function(){t.$emit("ngRepeatFinished")})}}}]),angular.module("app").directive("person",["enumService",function(e){return{restrict:"E",scope:{person:"="},templateUrl:"/views/person.html",link:function(e){}}}]),angular.module("app").directive("phones",["enumService",function(e){return{restrict:"E",scope:{title:"=",phones:"="},templateUrl:"/views/phones.html",link:function(t){e.PhoneTypes().then(function(e){t.phoneTypes=e.data}),t.addPhone=function(){t.phones.push({})},t.deletePhone=function(e){var r=t.phones.indexOf(e,0);r>-1&&t.phones.splice(r,1)}}}}]),angular.module("app").directive("scheduler",["enumService",function(e){return{restrict:"E",scope:{schedule:"="},templateUrl:"/views/scheduler.html",link:function(t){function r(){for(var e=[],t=0;t<7;t++){e[t]=[];for(var r=0;r<2;r++){e[t][r]=[];for(var a=0;a<2;a++)e[t][r][a]=!1}}return e}e.WeekDays().then(function(e){t.weekDays=e.data,t.daysOrder=[1,2,3,4,5,6,0],t.timesOrder=[0,1],t.dynamicPopover={templateUrl:"myPopoverTemplate.html",hour:0,minute:0,n:0,m:0,z:0,isOpen:r()}}),t.changeActive=function(e){t.schedule.DayEntries[e].Active=!t.schedule.DayEntries[e].Active},t.popover=function(e,a,n){0==t.dynamicPopover.z&&(t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].StartHour=t.dynamicPopover.hour,t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].StartMinute=t.dynamicPopover.minute),1==t.dynamicPopover.z&&(t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].EndHour=t.dynamicPopover.hour,t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].EndMinute=t.dynamicPopover.minute),0==n&&(t.dynamicPopover.hour=t.schedule.DayEntries[e].TimeEntries[a].StartHour,t.dynamicPopover.minute=t.schedule.DayEntries[e].TimeEntries[a].StartMinute),1==n&&(t.dynamicPopover.hour=t.schedule.DayEntries[e].TimeEntries[a].EndHour,t.dynamicPopover.minute=t.schedule.DayEntries[e].TimeEntries[a].EndMinute);var s=t.dynamicPopover.isOpen[e][a][n];t.dynamicPopover.isOpen=r(),t.dynamicPopover.isOpen[e][a][n]=!s,t.dynamicPopover.n=e,t.dynamicPopover.m=a,t.dynamicPopover.z=n}}}}]),angular.module("app").directive("selectPicker",["$timeout",function(e){return{restrict:"A",scope:!1,link:function(t,r){e(function(){var e=$(r);e.selectpicker("refresh")})}}}]),angular.module("app").directive("stringToDate",function(){return{require:"ngModel",link:function(e,t,r,a){a.$formatters.push(function(e){if(!e)return null;var t=new Date(e);return t})}}}),angular.module("app").filter("numberFixedLen",function(){return function(e,t){var r=parseInt(e,10),a=parseInt(t,10);if(isNaN(r)||isNaN(a))return e;for(r=""+r;r.length<a;)r="0"+r;return r}}),angular.module("app").factory("authInterceptorService",["$q","$injector","$location","localStorageService",function(e,t,r,a){var n={},s=function(e){e.headers=e.headers||{};var t=a.get("authorizationData");t&&(e.headers.Authorization="Bearer "+t.token);var r=a.get("language");return r&&(e.headers["Accept-Language"]=r),e},o=function(n){if(401===n.status){var s=t.get("authService"),o=a.get("authorizationData");if(o&&o.useRefreshTokens)return r.path("/refresh"),e.reject(n);s.logOut(),r.path("/login")}return e.reject(n)};return n.request=s,n.responseError=o,n}]),angular.module("app").factory("authService",["$http","$q","localStorageService","ngAuthSettings",function(e,t,r,a){var n=a.apiServiceBaseUri,s={},o={isAuth:!1,userName:"",useRefreshTokens:!1},i={provider:"",userName:"",externalAccessToken:""},u=function(t){return c(),e.post(n+"api/account/register",t).then(function(e){return e})},l=function(s){var i="grant_type=password&username="+s.userName+"&password="+s.password;s.useRefreshTokens&&(i=i+"&client_id="+a.clientId);var u=t.defer();return e.post(n+"token",i,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(e){s.useRefreshTokens?r.set("authorizationData",{token:e.access_token,userName:s.userName,refreshToken:e.refresh_token,useRefreshTokens:!0,isAdmin:e.isAdmin}):r.set("authorizationData",{token:e.access_token,userName:s.userName,refreshToken:"",useRefreshTokens:!1,isAdmin:e.isAdmin}),o.isAuth=!0,o.userName=s.userName,o.useRefreshTokens=s.useRefreshTokens,"True"===e.isAdmin?o.isAdmin=!0:o.isAdmin=!1,u.resolve(e)}).error(function(e){c(),u.reject(e)}),u.promise},c=function(){r.remove("authorizationData"),o.isAuth=!1,o.userName="",o.useRefreshTokens=!1,o.isAdmin=!1},d=function(){var e=r.get("authorizationData");e&&(o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=e.useRefreshTokens,"True"===e.isAdmin?o.isAdmin=!0:o.isAdmin=!1)},p=function(){var s=t.defer(),o=r.get("authorizationData");if(o&&o.useRefreshTokens){var i="grant_type=refresh_token&refresh_token="+o.refreshToken+"&client_id="+a.clientId;r.remove("authorizationData"),e.post(n+"token",i,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:e.refresh_token,useRefreshTokens:!0}),s.resolve(e)}).error(function(e){c(),s.reject(e)})}return s.promise},m=function(a){var s=t.defer();return e.get(n+"api/account/ObtainLocalAccessToken",{params:{provider:a.provider,externalAccessToken:a.externalAccessToken}}).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:"",useRefreshTokens:!1}),o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=!1,s.resolve(e)}).error(function(e){c(),s.reject(e)}),s.promise},f=function(a){var s=t.defer();return e.post(n+"api/account/registerexternal",a).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:"",useRefreshTokens:!1}),o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=!1,s.resolve(e)}).error(function(e){c(),s.reject(e)}),s.promise};return s.saveRegistration=u,s.login=l,s.logOut=c,s.fillAuthData=d,s.authentication=o,s.refreshToken=p,s.obtainAccessToken=m,s.externalAuthData=i,s.registerExternal=f,s}]),angular.module("app").service("enumService",["$http","baseUrl",function(e,t){this.AddressTypes=function(){return e.get(t+"api/enum/AddressType")},this.AppointmentStatuses=function(){return e.get(t+"api/enum/AppointmentStatus")},this.CallReasons=function(){return e.get(t+"api/enum/CallReason")},this.CallStatuses=function(){return e.get(t+"api/enum/CallStatus")},this.CallTypes=function(){return e.get(t+"api/enum/CallType")},this.InfoTypes=function(){return e.get(t+"api/enum/InfoType")},this.PhoneTypes=function(){return e.get(t+"api/enum/PhoneType")},this.WeekDays=function(){return e.get(t+"api/enum/DayOfWeek")}}]),angular.module("app").factory("localeService",["localStorageService","$translate","tmhDynamicLocale",function(e,t,r){var a={language:{key:"",dateFormat:""}};return a.getLocale=function(){var t=e.get("language");t||(t="el"),a.setLocale(t)},a.setLocale=function(n){a.language.key=n,"el"===n?a.language.dateFormat="dd/MM/yyyy HH:mm":a.language.dateFormat="MM/dd/yyyy HH:mm",t.use(n),r.set(n),e.set("language",n)},a.getLocale(),a}]);
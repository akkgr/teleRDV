"use strict";angular.module("app",["ngRoute","angular-loading-bar","treeControl","pascalprecht.translate","tmh.dynamicLocale","LocalStorageModule","ngSanitize","ui.checkbox","ui.bootstrap","ui.bootstrap.datetimepicker"]),angular.module("app").constant("baseUrl","/"),angular.module("app").constant("ngAuthSettings",{apiServiceBaseUri:"/",clientId:"cinnamon"}),angular.module("app").config(["$routeProvider",function(e){e.when("/login",{controller:"loginController",templateUrl:"views/login.html"}).when("/",{templateUrl:"views/main.html"}).when("/subscribers",{templateUrl:"views/subscribers.html",controller:"SubscribersCtrl"}).when("/subscribers/:id",{templateUrl:"views/subscriber.html",controller:"SubscriberCtrl"}).when("/specialties",{templateUrl:"views/specialties.html",controller:"SpecialtiesCtrl"}).when("/specialties/:id",{templateUrl:"views/specialty.html",controller:"SpecialtyCtrl"}).when("/paymentmethods",{templateUrl:"views/paymentmethods.html",controller:"PaymentMethodsCtrl"}).when("/paymentmethods/:id",{templateUrl:"views/paymentmethod.html",controller:"PaymentMethodCtrl"}).when("/socialsecurityfunds",{templateUrl:"views/socialsecurityfunds.html",controller:"SocialSecurityFundsCtrl"}).when("/socialsecurityfunds/:id",{templateUrl:"views/socialsecurityfund.html",controller:"SocialSecurityFundCtrl"}).when("/calendar",{templateUrl:"views/calendar.html",controller:"CalendarCtrl"}).when("/callqueue",{templateUrl:"views/callqueue.html",controller:"CallQueueCtrl"}).when("/users",{templateUrl:"views/users.html",controller:"UsersCtrl"}).when("/users/:id",{templateUrl:"views/user.html",controller:"UserCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("app").config(["cfpLoadingBarProvider",function(e){e.includeSpinner=!1}]),angular.module("app").config(["tmhDynamicLocaleProvider",function(e){e.localeLocationPattern("scripts/angular-locale_{{locale}}.js")}]),angular.module("app").run([function(){toastr.options.positionClass="toast-bottom-center",toastr.options.closeButton=!0,toastr.options.timeOut=0,toastr.options.extendedTimeOut=0}]),angular.module("app").config(["$httpProvider",function(e){e.interceptors.push("authInterceptorService")}]),angular.module("app").run(["authService",function(e){e.fillAuthData()}]),angular.module("app").config(["localStorageServiceProvider",function(e){e.setStorageType("sessionStorage")}]),angular.module("app").config(["$translateProvider",function(e){e.translations("en",{Subscribers:"Doctors",Subscriber:"Doctor",Specialties:"Specialties",SubscribersList:"Doctors List",LogIn:"Log In",ChangePassword:"Change Password",UsersManagment:"Users Managment",LogOut:"Log Out",LastName:"Last Name",FirstName:"First Name",Company:"Company",Info:"Profile",Phones:"Phones",Addresses:"Addresses",OtherInfo:"Social",DivertPhones:"Diverted Phones",Area:"Area",Street:"Street",PostalCode:"Postal Code",Number:"Number",Type:"Type",Home:"Home",Work:"Work",Mobile:"Mobile",Fax:"Fax",Floor:"Floor",CallAnswer:"Call Answer",Directions:"Directions",Specialty:"Specialty",Title:"Title",PaymentMethods:"Payment Methods",PaymentMethod:"Payment Method",SocialSecurityFunds:"Social Security Funds",SocialSecurityFund:"Social Security Fund",Monday:"Mon",Tuesday:"Tue",Wednesday:"Wed",Thursday:"Thu",Friday:"Fri",Saturday:"Sat",Sunday:"Sun",Schedule:"Work Schedule",Hour:"Hour",Minute:"Minute"}),e.translations("el",{Subscribers:"Ιατροί",Subscriber:"Ιατρός",Specialties:"Ειδικότητες",SubscribersList:"Αρχείο Ιατρών",LogIn:"Σύνδεση",ChangePassword:"Αλλαγή Κωδικού",UsersManagment:"Διαχείρηση Χρηστών",LogOut:"Αποσύνδεση",LastName:"Επώνυμο",FirstName:"Όνομα",Company:"Εταιρεία",Info:"Στοιχεία",Phones:"Τηλέφωνα",Addresses:"Διευθύνσεις",OtherInfo:"Άλλα Στοιχεία",DivertPhones:"Τηλ. Εκτροπής",Area:"Περιοχή",Street:"Οδός",PostalCode:"ΤΚ",Number:"Αριθμός",Type:"Είδος",Home:"Οικίας",Work:"Εργασίας",Mobile:"Κινητό",Fax:"Φαξ",Floor:"Όροφος",CallAnswer:"Τρόπος Απάντησης",Directions:"Πρόσβαση",Specialty:"Ειδικότητα",Title:"Περιγραφή",PaymentMethods:"Τρόποι Πληρωμής",PaymentMethod:"Τρόπος Πληρωμής",SocialSecurityFunds:"Ασφαλιστικά Ταμεία",SocialSecurityFund:"Ασφαλιστικό Ταμείο",Monday:"Δευ",Tuesday:"Τρι",Wednesday:"Τετ",Thursday:"Πεμ",Friday:"Παρ",Saturday:"Σαβ",Sunday:"Κυρ",Schedule:"Ωράριο Λειτουργίας",Hour:"Ώρα",Minute:"Λεπτά"}),e.preferredLanguage("el"),e.useSanitizeValueStrategy(null)}]),angular.module("app").controller("CalendarCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/subscribers"}).then(function(t){e.subscribers=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSubscriber=t},e.add=function(){r.path("/subscribers/new")},e.edit=function(){e.selectedSubscriber&&r.path("/subscribers/"+e.selectedSubscriber.Id)},e.getSpecialties=function(){t({method:"GET",url:a+"api/specialties/"}).then(function(t){e.specialties=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties(),e.getData()}]),angular.module("app").controller("CallQueueCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.newRow={},e.getData=function(){t({method:"GET",url:a+"api/callqueues"}).then(function(t){e.data=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.save=function(){t({method:"POST",url:"api/callqueues",data:e.newRow}).then(function(t){e.newRow=t.data,swal("Success","Call successfully saved.","success"),e.data.push(e.newRow),e.newRow={}},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getData()}]),angular.module("app").controller("loginController",["$scope","$location","authService","ngAuthSettings",function(e,t,r,a){e.loginData={userName:"",password:"",useRefreshTokens:!1},e.message="",e.login=function(){r.login(e.loginData).then(function(){t.path("/")},function(t){e.message=t.error_description})},e.authExternalProvider=function(t){var r=location.protocol+"//"+location.host+"/authcomplete.html",s=a.apiServiceBaseUri+"api/Account/ExternalLogin?provider="+t+"&response_type=token&client_id="+a.clientId+"&redirect_uri="+r;window.$windowScope=e,window.open(s,"Authenticate Account","location=0,status=0,width=600,height=750")},e.authCompletedCB=function(a){e.$apply(function(){if("False"==a.haslocalaccount)r.logOut(),r.externalAuthData={provider:a.provider,userName:a.external_user_name,externalAccessToken:a.external_access_token},t.path("/associate");else{var s={provider:a.provider,externalAccessToken:a.external_access_token};r.obtainAccessToken(s).then(function(){t.path("/orders")},function(t){e.message=t.error_description})}})}}]),angular.module("app").controller("NavCtrl",["$scope","$translate","authService","$location","localStorageService","tmhDynamicLocale","localeService","$http","baseUrl","$window",function(e,t,r,a,s,n,o,i,u,c){r.fillAuthData(),e.authentication=r.authentication,e.language=o.language,e.changeLanguage=function(e){o.setLocale(e),document.documentElement.setAttribute("lang",e)},e.logOut=function(){r.logOut(),a.path("/")},e.login=function(){r.logOut(),a.path("/login")},e.changePassword=function(){i({method:"PUT",url:u+"api/admin",data:e.user}).then(function(){swal("Success","Password successfully changed.","success"),$("#changeMyPassword").modal("hide")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.print=function(){i.get(u+"api/reports/requests/2000/1/1/2016/12/31/0",{responseType:"arraybuffer"}).success(function(e){var t=new Blob([e],{type:"application/pdf"}),r=URL.createObjectURL(t);c.open(r)}).error(function(e){var t=document.getElementById("pdf");t.data=null,e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})}}]),angular.module("app").controller("PaymentMethodsCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/paymentmethods"}).then(function(t){e.paymentmethods=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.add=function(){r.path("/paymentmethods/new")},e.edit=function(){e.selectedRow&&r.path("/paymentmethods/"+e.selectedRow.Id)},e.getData()}]),angular.module("app").controller("PaymentMethodCtrl",["$scope","$http","$routeParams","baseUrl","enumService","$location",function(e,t,r,a,s,n){e.getData=function(){"new"===r.id?e.specialty={}:t({method:"GET",url:a+"api/paymentmethods/"+r.id}).then(function(t){e.paymentmethod=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",s=a+"api/paymentmethods";e.paymentmethod.Id&&(r="PUT",s=a+"api/paymentmethods/"+e.paymentmethod.Id),t({method:r,url:s,data:e.paymentmethod}).then(function(t){e.paymentmethod=t.data,swal("Success","Payment Method successfully saved.","success"),n.path("/paymentmethods")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.paymentmethod.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Payment Method?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/paymentmethods/"+e.paymentmethod.Id}).then(function(){swal("Success","Payment Method successfully deleted.","success"),n.path("/paymentmethods")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("SocialSecurityFundCtrl",["$scope","$http","$routeParams","baseUrl","enumService","$location",function(e,t,r,a,s,n){e.getData=function(){"new"===r.id?e.item={}:t({method:"GET",url:a+"api/socialsecurityfunds/"+r.id}).then(function(t){e.item=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",s=a+"api/socialsecurityfunds";e.item.Id&&(r="PUT",s=a+"api/socialsecurityfunds/"+e.item.Id),t({method:r,url:s,data:e.item}).then(function(t){e.item=t.data,swal("Success","Social Security Fund successfully saved.","success"),n.path("/socialsecurityfunds")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.item.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Social Security Fund?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/socialsecurityfunds/"+e.item.Id}).then(function(){swal("Success","Social Security Fund successfully deleted.","success"),n.path("/socialsecurityfunds")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("SocialSecurityFundsCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/socialsecurityfunds"}).then(function(t){e.items=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedRow=t},e.add=function(){r.path("/socialsecurityfunds/new")},e.edit=function(){e.selectedRow&&r.path("/socialsecurityfunds/"+e.selectedRow.Id)},e.getData()}]),angular.module("app").controller("SpecialtiesCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/specialties"}).then(function(t){e.specialties=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSpecialty=t},e.add=function(){r.path("/specialties/new")},e.edit=function(){e.selectedSpecialty&&r.path("/specialties/"+e.selectedSpecialty.Id)},e.getData()}]),angular.module("app").controller("SpecialtyCtrl",["$scope","$http","$routeParams","baseUrl","enumService","$location",function(e,t,r,a,s,n){e.getData=function(){"new"===r.id?e.specialty={}:t({method:"GET",url:a+"api/specialties/"+r.id}).then(function(t){e.specialty=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",s=a+"api/specialties";e.specialty.Id&&(r="PUT",s=a+"api/specialties/"+e.specialty.Id),t({method:r,url:s,data:e.specialty}).then(function(t){e.specialty=t.data,swal("Success","Specialty successfully saved.","success"),n.path("/specialties")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.specialty.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this Specialty?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/specialties/"+e.specialty.Id}).then(function(){swal("Success","Specialty successfully deleted.","success"),n.path("/specialties")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.getData()}]),angular.module("app").controller("SubscriberCtrl",["$scope","$http","$routeParams","baseUrl","enumService","$location",function(e,t,r,a,s,n){s.PhoneTypes().then(function(t){e.phoneTypes=t.data}),s.AddressTypes().then(function(t){e.addressTypes=t.data}),s.InfoTypes().then(function(t){e.infoTypes=t.data}),e.getData=function(){t({method:"GET",url:a+"api/subscribers/"+r.id}).then(function(t){e.subscriber=t.data,$(".selectpicker").selectpicker("refresh"),e.subscriber.Specialty&&$(".selectpicker").selectpicker("val",e.subscriber.Specialty.Id)},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.save=function(){var r="POST",s=a+"api/subscribers";e.subscriber.Id&&(r="PUT",s=a+"api/subscribers/"+e.subscriber.Id),t({method:r,url:s,data:e.subscriber}).then(function(t){e.subscriber=t.data,swal("Success","Contact successfully saved.","success"),n.path("/subscribers")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.subscriber.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this contact?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/subscribers/"+e.subscriber.Id}).then(function(){swal("Success","Subscriber successfully deleted.","success"),n.path("/subscribers")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.addAddress=function(){e.subscriber.Addresses.push({})},e.deleteAddress=function(t){var r=e.subscriber.Addresses.indexOf(t,0);r>-1&&e.subscriber.Addresses.splice(r,1)},e.addPhone=function(){e.subscriber.Phones.push({})},e.deletePhone=function(t){var r=e.subscriber.Phones.indexOf(t,0);r>-1&&e.subscriber.Phones.splice(r,1)},e.addInfo=function(){e.subscriber.Infos.push({})},e.deleteInfo=function(t){var r=e.subscriber.Infos.indexOf(t,0);r>-1&&e.subscriber.Infos.splice(r,1)},e.addDivertPhone=function(){e.subscriber.DivertPhones.push({})},e.deleteDivertPhone=function(t){var r=e.subscriber.DivertPhones.indexOf(t,0);r>-1&&e.subscriber.DivertPhones.splice(r,1)},e.getSpecialties=function(){t({method:"GET",url:a+"api/specialties/"}).then(function(t){e.specialties=t.data,e.getData()},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties()}]),angular.module("app").controller("SubscribersCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/subscribers"}).then(function(t){e.subscribers=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedSubscriber=t},e.add=function(){r.path("/subscribers/new")},e.edit=function(){e.selectedSubscriber&&r.path("/subscribers/"+e.selectedSubscriber.Id)},e.getSpecialties=function(){t({method:"GET",url:a+"api/specialties/"}).then(function(t){e.specialties=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getSpecialties(),e.getData()}]),angular.module("app").controller("UserCtrl",["$scope","$http","$routeParams","baseUrl","$location",function(e,t,r,a,s){e.getRoles=function(){t({method:"GET",url:a+"api/roles/"}).then(function(t){e.roles=t.data,$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getData=function(){"new"===r.id?(e.isNew=!0,e.user={Roles:[]},e.getRoles()):(e.isNew=!1,t({method:"GET",url:a+"api/users/"+r.id}).then(function(t){e.user=t.data,e.getRoles(),$(".selectpicker").selectpicker("refresh")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")}))},e.save=function(){var r="POST",n=a+"api/users";e.user.Id&&(r="PUT",n=a+"api/users/"+e.user.Id),t({method:r,url:n,data:e.user}).then(function(t){e.user=t.data,swal("Success","Contact successfully saved.","success"),s.path("/users")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.delete=function(){e.user.Id&&swal({title:"Are you sure?",text:"Are you sure that you want to delete this contact?",type:"warning",showCancelButton:!0,closeOnConfirm:!1,confirmButtonText:"Yes, delete it!",confirmButtonColor:"#ec6c62"},function(){t({method:"DELETE",url:a+"api/users/"+e.user.Id}).then(function(){swal("Success","Contact successfully deleted.","success"),s.path("/users")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})})},e.changePassword=function(){t({method:"POST",url:a+"api/admin",data:e.user}).then(function(){swal("Success","Password successfully changed.","success"),$("#changeUserPassword").modal("hide")},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.getRoles(),e.getData()}]),angular.module("app").controller("UsersCtrl",["$scope","$http","$location","baseUrl",function(e,t,r,a){e.getData=function(){t({method:"GET",url:a+"api/users"}).then(function(t){e.users=t.data},function(e){e.status===-1?swal("Error","Server unavailable!","error"):swal("Error",e.statusText+". "+e.data.Message,"error")})},e.selectRow=function(t){e.selectedUser=t},e.add=function(){r.path("/users/new")},e.edit=function(){e.selectedUser&&r.path("/users/"+e.selectedUser.Id)},e.getData()}]),angular.module("app").factory("authInterceptorService",["$q","$injector","$location","localStorageService",function(e,t,r,a){var s={},n=function(e){e.headers=e.headers||{};var t=a.get("authorizationData");t&&(e.headers.Authorization="Bearer "+t.token);var r=a.get("language");return r&&(e.headers["Accept-Language"]=r),e},o=function(s){if(401===s.status){var n=t.get("authService"),o=a.get("authorizationData");if(o&&o.useRefreshTokens)return r.path("/refresh"),e.reject(s);n.logOut(),r.path("/login")}return e.reject(s)};return s.request=n,s.responseError=o,s}]),angular.module("app").factory("authService",["$http","$q","localStorageService","ngAuthSettings",function(e,t,r,a){var s=a.apiServiceBaseUri,n={},o={isAuth:!1,userName:"",useRefreshTokens:!1},i={provider:"",userName:"",externalAccessToken:""},u=function(t){return l(),e.post(s+"api/account/register",t).then(function(e){return e})},c=function(n){var i="grant_type=password&username="+n.userName+"&password="+n.password;n.useRefreshTokens&&(i=i+"&client_id="+a.clientId);var u=t.defer();return e.post(s+"token",i,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(e){n.useRefreshTokens?r.set("authorizationData",{token:e.access_token,userName:n.userName,refreshToken:e.refresh_token,useRefreshTokens:!0,isAdmin:e.isAdmin}):r.set("authorizationData",{token:e.access_token,userName:n.userName,refreshToken:"",useRefreshTokens:!1,isAdmin:e.isAdmin}),o.isAuth=!0,o.userName=n.userName,o.useRefreshTokens=n.useRefreshTokens,"True"===e.isAdmin?o.isAdmin=!0:o.isAdmin=!1,u.resolve(e)}).error(function(e){l(),u.reject(e)}),u.promise},l=function(){r.remove("authorizationData"),o.isAuth=!1,o.userName="",o.useRefreshTokens=!1,o.isAdmin=!1},d=function(){var e=r.get("authorizationData");e&&(o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=e.useRefreshTokens,"True"===e.isAdmin?o.isAdmin=!0:o.isAdmin=!1)},p=function(){var n=t.defer(),o=r.get("authorizationData");if(o&&o.useRefreshTokens){var i="grant_type=refresh_token&refresh_token="+o.refreshToken+"&client_id="+a.clientId;r.remove("authorizationData"),e.post(s+"token",i,{headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:e.refresh_token,useRefreshTokens:!0}),n.resolve(e)}).error(function(e){l(),n.reject(e)})}return n.promise},h=function(a){var n=t.defer();return e.get(s+"api/account/ObtainLocalAccessToken",{params:{provider:a.provider,externalAccessToken:a.externalAccessToken}}).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:"",useRefreshTokens:!1}),o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=!1,n.resolve(e)}).error(function(e){l(),n.reject(e)}),n.promise},m=function(a){var n=t.defer();return e.post(s+"api/account/registerexternal",a).success(function(e){r.set("authorizationData",{token:e.access_token,userName:e.userName,refreshToken:"",useRefreshTokens:!1}),o.isAuth=!0,o.userName=e.userName,o.useRefreshTokens=!1,n.resolve(e)}).error(function(e){l(),n.reject(e)}),n.promise};return n.saveRegistration=u,n.login=c,n.logOut=l,n.fillAuthData=d,n.authentication=o,n.refreshToken=p,n.obtainAccessToken=h,n.externalAuthData=i,n.registerExternal=m,n}]),angular.module("app").service("enumService",["$http","baseUrl",function(e,t){this.AddressTypes=function(){return e.get(t+"api/enum/address")},this.InfoTypes=function(){return e.get(t+"api/enum/info")},this.PhoneTypes=function(){return e.get(t+"api/enum/phone")},this.WeekDays=function(){return e.get(t+"api/enum/weekdays")}}]),angular.module("app").factory("localeService",["localStorageService","$translate","tmhDynamicLocale",function(e,t,r){var a={language:{key:"",dateFormat:""}};return a.getLocale=function(){var t=e.get("language");t||(t="el"),a.setLocale(t)},a.setLocale=function(s){a.language.key=s,"el"===s?a.language.dateFormat="dd/MM/yyyy HH:mm":a.language.dateFormat="MM/dd/yyyy HH:mm",t.use(s),r.set(s),e.set("language",s)},a.getLocale(),a}]),angular.module("app").filter("numberFixedLen",function(){return function(e,t){var r=parseInt(e,10);if(t=parseInt(t,10),isNaN(r)||isNaN(t))return e;for(r=""+r;r.length<t;)r="0"+r;return r}}),angular.module("app").directive("convertToNumber",function(){return{require:"ngModel",link:function(e,t,r,a){a.$parsers.push(function(e){return parseInt(e,10)}),a.$formatters.push(function(e){return""+e})}}}),angular.module("app").directive("formHeader",function(){return{restrict:"E",transclude:!0,replace:!0,scope:{delete:"&?",save:"&"},templateUrl:"/views/form-header.html",link:function(e){e.canDelete=!!angular.isDefined(e.delete),$(function(){$('[data-toggle="tooltip"]').tooltip()})}}}),angular.module("app").directive("listHeader",function(){return{restrict:"E",transclude:!0,replace:!0,scope:{search:"=",add:"&?",edit:"&?",save:"&",filter:"&"},templateUrl:"/views/list-header.html",link:function(e){e.canAdd=!!angular.isDefined(e.add),e.canEdit=!!angular.isDefined(e.edit),$(function(){$('[data-toggle="tooltip"]').tooltip()})}}}),angular.module("app").directive("myDateInput",["localeService",function(e){return{restrict:"E",scope:{dateTime:"="},template:'<div class="input-group"><input type="text" class="form-control" datetime-picker="{{language.dateFormat}}" datepicker-options="popup.options" ng-model="dateTime" is-open="popup.opened"><span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="open()"><i class="glyphicon glyphicon-calendar"></i></button></span></div>',link:function(t){t.open=function(){t.popup.opened=!0},t.popup={opened:!1,options:{showWeeks:!1}},t.language=e.language}}}]),angular.module("app").directive("onFinishRender",["$timeout",function(e){return{restrict:"A",link:function(t){t.$last===!0&&e(function(){t.$emit("ngRepeatFinished")})}}}]),angular.module("app").directive("scheduler",["enumService",function(e){return{restrict:"E",scope:{schedule:"="},templateUrl:"/views/scheduler.html",link:function(t){function r(){for(var e=[],t=0;t<7;t++){e[t]=[];for(var r=0;r<2;r++){e[t][r]=[];for(var a=0;a<2;a++)e[t][r][a]=!1}}return e}e.WeekDays().then(function(e){t.weekDays=e.data,t.daysOrder=[1,2,3,4,5,6,0],t.timesOrder=[0,1],t.dynamicPopover={templateUrl:"myPopoverTemplate.html",hour:0,minute:0,n:0,m:0,z:0,isOpen:r()}}),t.changeActive=function(e){t.schedule.DayEntries[e].Active=!t.schedule.DayEntries[e].Active},t.popover=function(e,a,s){0==t.dynamicPopover.z&&(t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].StartHour=t.dynamicPopover.hour,t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].StartMinute=t.dynamicPopover.minute),1==t.dynamicPopover.z&&(t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].EndHour=t.dynamicPopover.hour,t.schedule.DayEntries[t.dynamicPopover.n].TimeEntries[t.dynamicPopover.m].EndMinute=t.dynamicPopover.minute),0==s&&(t.dynamicPopover.hour=t.schedule.DayEntries[e].TimeEntries[a].StartHour,t.dynamicPopover.minute=t.schedule.DayEntries[e].TimeEntries[a].StartMinute),1==s&&(t.dynamicPopover.hour=t.schedule.DayEntries[e].TimeEntries[a].EndHour,t.dynamicPopover.minute=t.schedule.DayEntries[e].TimeEntries[a].EndMinute);var n=t.dynamicPopover.isOpen[e][a][s];t.dynamicPopover.isOpen=r(),t.dynamicPopover.isOpen[e][a][s]=!n,t.dynamicPopover.n=e,t.dynamicPopover.m=a,t.dynamicPopover.z=s}}}}]),angular.module("app").directive("selectPicker",["$timeout",function(e){return{restrict:"A",scope:!1,link:function(t,r){e(function(){var e=$(r);e.selectpicker("refresh")})}}}]),angular.module("app").directive("stringToDate",function(){return{require:"ngModel",link:function(e,t,r,a){a.$formatters.push(function(e){if(!e)return null;var t=new Date(e);return t})}}});
'use strict';

angular.module('app')
.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'Subscribers': 'Doctors',
        'Subscriber': 'Doctor',
        'Specialties': 'Specialties',
        'SubscribersList': 'Doctors List',
        'LogIn': 'Log In',
        'ChangePassword': 'Change Password',
        'UsersManagment': 'Users Managment',
        'LogOut': 'Log Out',
        'LastName': 'Last Name',
        'FirstName': 'First Name',
        'Company': 'Company',
        'Info': 'Profile',
        'Phones': 'Phones',
        'Addresses': 'Addresses',
        'OtherInfo': 'Social',
        'DivertPhones': 'Diverted Phones',
        'Area': 'Area',
        'Street': 'Street',
        'PostalCode': 'Postal Code',
        'Number': 'Number',
        'Type': 'Type',
        'Home': 'Home',
        'Work': 'Work',
        'Mobile': 'Mobile',
        'Fax': 'Fax',
        'Floor': 'Floor',
        'CallAnswer': 'Call Answer',
        'Directions': 'Directions',
        'Specialty': 'Specialty',
        'Title': 'Title'
    });

    $translateProvider.translations('el', {
        'Subscribers': 'Ιατροί',
        'Subscriber': 'Ιατρός',
        'Specialties': 'Ειδικότητες',
        'SubscribersList': 'Αρχείο Ιατρών',
        'LogIn': 'Σύνδεση',
        'ChangePassword': 'Αλλαγή Κωδικού',
        'UsersManagment': 'Διαχείρηση Χρηστών',
        'LogOut': 'Αποσύνδεση',
        'LastName': 'Επώνυμο',
        'FirstName': 'Όνομα',
        'Company': 'Εταιρεία',
        'Info': 'Στοιχεία',
        'Phones': 'Τηλέφωνα',
        'Addresses': 'Διευθύνσεις',
        'OtherInfo': 'Άλλα Στοιχεία',
        'DivertPhones': 'Τηλ. Εκτροπής',
        'Area': 'Περιοχή',
        'Street': 'Οδός',
        'PostalCode': 'ΤΚ',
        'Number': 'Αριθμός',
        'Type': 'Είδος',
        'Home': 'Οικίας',
        'Work': 'Εργασίας',
        'Mobile': 'Κινητό',
        'Fax': 'Φαξ',
        'Floor': 'Όροφος',
        'CallAnswer': 'Τρόπος Απάντησης',
        'Directions': 'Πρόσβαση',
        'Specialty': 'Ειδικότητα',
        'Title': 'Περιγραφή' 
    });

    $translateProvider.preferredLanguage('el');

    $translateProvider.useSanitizeValueStrategy(null);
}]);
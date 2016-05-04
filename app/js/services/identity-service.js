'use strict';

angular.module('issueTracker.services')
    .factory('identityService', [function () {

        var id = null;
        var username = null;
        var userIsAdmin = false;
        var isLoggedIn = false;

        function setIdentity(user) {
            id = user.Id;
            username = user.Username;
            userIsAdmin = user.isAdmin;
            isLoggedIn = true;
        }

        function removeIdentity() {
            id = null;
            username = null;
            userIsAdmin = false;
            isLoggedIn = false;
        }

        function getId() {
            return id;
        }

        function getUsername() {
            return username;
        }

        function isAdmin() {
            return userIsAdmin;
        }

        function isLogged() {
            return isLoggedIn;
        }

        return {
            setIdentity: setIdentity,
            removeIdentity: removeIdentity,
            getId: getId,
            getUsername: getUsername,
            isAdmin: isAdmin,
            isLogged: isLogged
        }
    }]);

let AppName = 'Boss';

let Boss = angular.module('bossApp', [
    'ngRoute',
    'ui.bootstrap',
    'btford.socket-io',
    'bossControllers'
]),

routes = [
    {
        path: '/door',
        templateUrl: 'pages/door.html',
        controller: 'DoorController',
        name: 'Garage Door'
    },
    {
        path: '/audit',
        templateUrl: 'pages/auditLog.html',
        controller: 'AuditController',
        name: 'Audit Log'
    }
],

defaultRoute = 0;

Boss.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    var def = $routeProvider;
    for (var i = 0; i < routes.length; i++) {
        def = def.when(routes[i].path, routes[i]);
    }
    def.otherwise({
        redirectTo: routes[defaultRoute].path
    });

//    $locationProvider.html5Mode(true);
}]);

let bossControllers = angular.module('bossControllers', ['ui.bootstrap', 'btford.socket-io']);

bossControllers.factory('socket', function (socketFactory) {
    var ioSocket = io.connect('/', { path: '/boss-ws-events' });
    var socket = socketFactory({
        ioSocket: ioSocket
    });
    return socket;
});

// http://stackoverflow.com/questions/23659395/can-i-use-angular-variables-as-the-source-of-an-audio-tag
bossControllers.directive('audios', function($sce) {
    return {
        restrict: 'A',
        scope: { code:'=' },
        replace: true,
        template: '<audio ng-src="{{url}}" controls></audio>',
        link: function (scope) {
            scope.$watch('code', function (newVal, oldVal) {
                if (newVal !== undefined) {
                    scope.url = $sce.trustAsResourceUrl(newVal);
                }
            });
        }
    };
});

Boss.run(['$route', ($route) => {
    $route.reload();
}]);

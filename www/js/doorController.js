bossControllers.controller('DoorController', ['$scope', '$http', '$window', 'socket', function ($scope, $http, $window, socket) {
    $scope.videos = [];
    $scope.webcamFeed = '';
    $scope.state = 'Loading...';

    $scope.check = (val) => {
        switch (val) {
            case 0:
                return $scope.state === 'Closed';
            case 1:
                return $scope.state === 'Open';
            default:
                return $scope.state !== 'Open' && $scope.state !== 'Closed';
        }
    }

    $scope.openVideo = (video) => {
        $window.open('/videos/' + video, '_blank');
    };

    $scope.toDateString = (videoName) => {
        let eventNumber = parseInt(videoName.substr(0, 2)),
            year = parseInt(videoName.substr(3, 4)),
            month = parseInt(videoName.substr(7, 2)),
            day = parseInt(videoName.substr(9, 2)),
            hour = parseInt(videoName.substr(11, 2)),
            min = parseInt(videoName.substr(13, 2)),
            sec = parseInt(videoName.substr(15, 2));

        let date = new Date(year, month, day, hour, min, sec);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    socket.on('videos', (data) => {
        $scope.videos = data;
    });

    socket.emit('videos');

    socket.on('state', (data) => {
        $scope.state = data.state;
        $scope.webcamFeed = data.webcamFeed;
    });

    socket.on('doorState', (data) => {
        $scope.state = data;
    });

    socket.emit('state');

    $scope.openDoor = () => {
        $http.get("/api/open").then((response) => {});
    };

    $scope.closeDoor = () => {
        $http.get("/api/close").then((response) => {});
    };

    $scope.deleteVideo = (video) => {
        socket.emit('videos', {
            delete: video
        });
    };
}]);

'use strict';
//Executed on clicking the calendar
app.controller('CalCntrl',function ($scope,$rootScope){
$scope.date=new Date();

   $scope.getval=(startDate,todaydate)=> {

       $rootScope.calDate = startDate; // stores select date
       $rootScope.todaysDate=todaydate;// stores current date
       console.log($rootScope.calDate);
       console.log($rootScope.todaysDate);
   };




});

// Controller for opening insert box
app.controller('dial', function($scope, $mdDialog,$rootScope,$window) {

$rootScope.booleanck=false;

//validation check
    $scope.showAdvanced = function(ev) {
        if($rootScope.calDate<$rootScope.todaysDate)
        {
            $window.alert("You cannot add events for passed dates");
        }else{
            $mdDialog.show({
                //controller: DialogController,
                templateUrl: '../DialogTemplate.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            });

        }

    };




});

//For insert and update operations
app.controller('final', function($scope, $mdDialog,$rootScope, $interval, $window) {


$scope.eventName=$rootScope.globalValue;
$scope.twelveTimeStart=$rootScope.globalTime;
$scope.LatestDisplay=$rootScope.latestDate;
   $scope.daysleft= $rootScope.daysLeft;
    $scope.hoursleft=  $rootScope.hoursLeft;
  var total=parseInt($rootScope.daysLeft.toString())+parseInt($rootScope.hoursLeft.toString())+parseInt($rootScope.minutesLeft.toString())+parseInt($rootScope.secondsLeft.toString());
console.log("change value"+$rootScope.daysleft);



    $scope.answer=(value,value2,value3)=>{

        //When insering this code is being executed
        if($rootScope.booleanck==false)
        {
            $rootScope.count=$rootScope.count+1;

            const convertTimeValue=value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const getDateByIntervals=new Date($rootScope.calDate).getDate().toString();
            const getMonthByIntervals=new Date($rootScope.calDate).getMonth().toString();
            const getYearByIntervals=new Date($rootScope.calDate).getFullYear().toString();
            var check=convertTimeValue.toString().split(":");
            const check2=check[1].toString().split(" ");
            var AMPM="";
            if(check[0]=="12" && check2[1]=="PM")
            {
                check[0]=check[0];
            }
            else if(check[0]=="12" && check2[1]=="AM")
            {
                check[0]=0;
            }else
            if(check2[1]=="PM")
            {
                check[0]=parseInt(check[0])+12;
            }
            const convertValue=parseInt(check[0]);
            const DateConvert = new Date(parseInt(getYearByIntervals), parseInt(getMonthByIntervals), parseInt(getDateByIntervals), parseInt(check[0]), parseInt(check2[0]), 0);


            $rootScope.events.push({
                id:$rootScope.count,
                dateval:$rootScope.calDate,
                Starttime:value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                eventName:value3,
                timeStamp:DateConvert,
            });

            $rootScope.timerValue=1000;
            console.log("day"+getDateByIntervals);
            console.log("month"+getMonthByIntervals);
            console.log("year"+getYearByIntervals);
            console.log("check 0"+check[0]);
            console.log($rootScope.events);

            var ckbool=true;


            var mostRecentDate = new Date(Math.min.apply(null, $rootScope.events.map( e => {
                return new Date(e.timeStamp);
            })));
            var mostRecentObject = $rootScope.events.filter( e => {
                var d = new Date( e.timeStamp );
                return d.getTime() == mostRecentDate.getTime();
            })[0];


            console.log("Latest object"+mostRecentObject.eventName)
            $rootScope.latestDate=mostRecentDate;
            $rootScope.latestObject=mostRecentObject;


            var currDate=new Date();
            $scope.CountDown = {

                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                getTimeRemaining: function(endtime) {
                    var timeMap=new Date(2020, 6, 27, 13, 30, 0);
                    var t = $rootScope.latestDate - Date.parse(new Date());
                    var seconds = Math.floor((t / 1000) % 60);
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));
                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };
                },

                initializeClock: function(endtime) {

                    function updateClock() {
                       // $interval.cancel(timeinterval);
                        $rootScope.timerValue=1000;
                        var t = $scope.CountDown.getTimeRemaining(endtime);

                        $scope.CountDown.days = t.days < 10 ? '0' + t.days : t.days;
                        $scope.CountDown.hours = ('0' + t.hours).slice(-2);
                        $scope.CountDown.minutes = ('0' + t.minutes).slice(-2);
                        $scope.CountDown.seconds = ('0' + t.seconds).slice(-2);
                        $rootScope.daysLeft=$scope.CountDown.days;
                        $rootScope.hoursLeft=$scope.CountDown.hours;
                        $rootScope.minutesLeft=$scope.CountDown.minutes;
                        $rootScope.secondsLeft=$scope.CountDown.seconds;



                        if (t.total <= 0) {

                            $interval.cancel(timeinterval);

                            console.log("call ones");

                        }

                    }

                    updateClock();
                    var timeinterval = $interval(updateClock, $rootScope.timerValue);
                }

            }

            var deadline = new Date(Date.parse(new Date()) + 2 * 12 * 60 * 60 * 1000);
            $scope.CountDown.initializeClock(deadline);


        }else{
                //When Updating this else is executed

            const convertTimeValue=value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const getDateByIntervals=new Date($rootScope.calDate).getDate().toString();
            const getMonthByIntervals=new Date($rootScope.calDate).getMonth().toString();
            const getYearByIntervals=new Date($rootScope.calDate).getFullYear().toString();
            const check=convertTimeValue.toString().split(":");
            const check2=check[1].toString().split(" ");
            const AMPMM="";
            if(check[0]=="12" && check2[1]=="PM")
            {
                check[0]=check[0];
            }
            else if(check[0]=="12" && check2[1]=="AM")
            {
                check[0]=0;
            }else
            if(check2[1]=="PM")
            {
                check[0]=parseInt(check[0])+12;
            }
            const convertValue=parseInt(check[0]);
            const DateConvert = new Date(parseInt(getYearByIntervals), parseInt(getMonthByIntervals), parseInt(getDateByIntervals), parseInt(check[0]), parseInt(check2[0]), 0);


            $rootScope.events.find(v => v.id == $rootScope.idVal).eventName=value3;
            $rootScope.events.find(v => v.id == $rootScope.idVal).Starttime=value.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            $rootScope.events.find(v => v.id == $rootScope.idVal).timeStamp=DateConvert;


            // To find most recent event after updating

            var mostRecentDate = new Date(Math.min.apply(null, $rootScope.events.map( e => {
                return new Date(e.timeStamp);
            })));
            var mostRecentObject = $rootScope.events.filter( e => {
                var d = new Date( e.timeStamp );
                return d.getTime() == mostRecentDate.getTime();
            })[0];


            $rootScope.latestDate=mostRecentDate;
            $rootScope.latestObject=mostRecentObject;


            $scope.CountDown = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                getTimeRemaining: function(endtime) {
                    var timeMap=new Date(2020, 6, 27, 13, 30, 0);
                    var t = $rootScope.latestDate - Date.parse(new Date());
                    var seconds = Math.floor((t / 1000) % 60);
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));
                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };
                },

                initializeClock: function(endtime) {
                    function updateClock() {
                        var t = $scope.CountDown.getTimeRemaining(endtime);

                        $scope.CountDown.days = t.days < 10 ? '0' + t.days : t.days;
                        $scope.CountDown.hours = ('0' + t.hours).slice(-2);
                        $scope.CountDown.minutes = ('0' + t.minutes).slice(-2);
                        $scope.CountDown.seconds = ('0' + t.seconds).slice(-2);
                        $rootScope.daysLeft=$scope.CountDown.days;
                        $rootScope.hoursLeft=$scope.CountDown.hours;
                        $rootScope.minutesLeft=$scope.CountDown.minutes;
                        $rootScope.secondsLeft=$scope.CountDown.seconds;
                        if (t.total <= 0) {
                            $interval.cancel(timeinterval);
                        }

                    }

                    updateClock();
                    var timeinterval = $interval(updateClock, 1000);
                }
            };








        }



console.log("Being executed");
    };//Ending here



//For reseting the insert model
    $scope.reset=()=>{
        $rootScope.booleanck=false;
        $scope.eventName="";
        $scope.twelveTimeStart="";

    }

    //for removing and event
    $scope.remove=(itemValue)=>{
        var index = $scope.events.indexOf(itemValue);
        $scope.events.splice(index, 1);
    };

    // for editing an item
    $scope.editItem = function(ev,value1,value2,value3) {
        $rootScope.booleanck=true;
        $rootScope.idVal="";
        console.log(value2);
        console.log(value1);

        const check=value1.toString().split(":");
        const check2=check[1].toString().split(" ");
        const convertValue=parseInt(check[0]);
        const DateConvert = new Date(2016, 11, 31, parseInt(check[0]), parseInt(check2[0]), 0);

        console.log(DateConvert);
        //console.log("hi2"+check2);
        $rootScope.idVal=value3;
        $rootScope.globalTime=DateConvert;
       $rootScope.globalValue=value2;

        $mdDialog.show({
            //controller: DialogController,
            templateUrl: '../DialogTemplate.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
                console.log($scope.status);
            });


    };

});


app.controller('latestDate', function($scope,$rootScope,$interval, $mdDialog) {

    var copy;
$scope.refresh=()=>{

    var mostRecentDate = new Date(Math.min.apply(null, $rootScope.events.map( e => {
        return new Date(e.timeStamp);
    })));
    var mostRecentObject = $rootScope.events.filter( e => {
        var d = new Date( e.timeStamp );
        return d.getTime() == mostRecentDate.getTime();
    })[0];


    //items added to expired array based on its expiration time
   if(mostRecentDate<=new Date())
    {

        let index2 = $rootScope.events.findIndex( record => record.Starttime === mostRecentObject.Starttime );
       // $rootScope.deletedEvents.push($rootScope.events[index2]);
    $rootScope.deletedEvents1.push($rootScope.events[index2]);
        copy=$rootScope.events.splice(index2, 1);


        //$rootScope.deletedEvents.push(...$rootScope.events.splice(index2, 1));
        console.log($rootScope.events);
    console.log($rootScope.deletedEvents1);

    }

    if(copy!=null)
    {
        console.log("when inside copy");
        var mostRecentDate1 = new Date(Math.min.apply(null, $rootScope.events.map( e => {
            return new Date(e.timeStamp);
        })));
        var mostRecentObject1 = $rootScope.events.filter( e => {
            var d = new Date( e.timeStamp );
            return d.getTime() == mostRecentDate.getTime();
        })[0];

        $rootScope.latestDate=mostRecentDate1;
        $rootScope.latestObject=mostRecentObject1;


            $scope.CountDown = {

        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        getTimeRemaining: function(endtime) {
            var timeMap=new Date(2020, 6, 27, 13, 30, 0);
            var t = $rootScope.latestDate - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        },

        initializeClock: function(endtime) {

            function updateClock() {
                // $interval.cancel(timeinterval);
                $rootScope.timerValue=1000;
                var t = $scope.CountDown.getTimeRemaining(endtime);

                $scope.CountDown.days = t.days < 10 ? '0' + t.days : t.days;
                $scope.CountDown.hours = ('0' + t.hours).slice(-2);
                $scope.CountDown.minutes = ('0' + t.minutes).slice(-2);
                $scope.CountDown.seconds = ('0' + t.seconds).slice(-2);
                $rootScope.daysLeft=$scope.CountDown.days;
                $rootScope.hoursLeft=$scope.CountDown.hours;
                $rootScope.minutesLeft=$scope.CountDown.minutes;
                $rootScope.secondsLeft=$scope.CountDown.seconds;

                // console.log("latest time"+$rootScope.latestObject.Starttime);
                // console.log("current time"+new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }));
                if($rootScope.latestObject.Starttime==new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }))
                {
                    console.log("being checked");

                }


                if (t.total <= 0) {

                    $interval.cancel(timeinterval);


                }


            }

            updateClock();
            var timeinterval = $interval(updateClock, $rootScope.timerValue);
        }

    }

    var deadline = new Date(Date.parse(new Date()) + 2 * 12 * 60 * 60 * 1000);
        $scope.CountDown.initializeClock(deadline);

    }

};


// To remove expired event
$scope.removeDel=(itemvalue)=>{
    var index = $rootScope.deletedEvents1.indexOf(itemvalue);
    $rootScope.deletedEvents1.splice(index, 1);

};


});

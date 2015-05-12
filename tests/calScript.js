$(document).ready(function() {
    $('#calendar').fullCalendar({
        height:600,
        selectable:true,
        header:{
            left:'prev,next,today',
            center:'title',
            right:'month,agendaDay'
        },
        defaultView:'month',
        dayClick:function(date,jsEvent,view){
            toDate = new Date(date);
            toDate.setDate(toDate.getDate() + 1 );
            console.log( toDate.toString() );
            $('#calendar').fullCalendar('gotoDate',toDate);
            $('#calendar').fullCalendar('changeView','agendaDay');
        }
    });
});

function doSubmit( myTitle, myStart, myEnd, myColor ){
    $("#calendar").fullCalendar('renderEvent',
    {
        title:myTitle,
        start:myStart,
        end:myEnd,
        color:myColor
    }, true );
    store( myTitle, myStart, myEnd, myColor );
}

function doOnload( myTitle, myStart, myEnd, myColor ){
    $("#calendar").fullCalendar('renderEvent',
    {
        title:myTitle,
        start:myStart,
        end:myEnd,
        color:myColor
    }, true );
}

function store( myTitle, myStart, myEnd, myColor ){
    //Check browser support
    if( typeof(Storage) != "undefined" ){
        //Store
        var toStore = { 'myTitle':myTitle, 'myStart':myStart, 'myEnd':myEnd, 'myColor':myColor };
        localStorage.setItem( myStart, JSON.stringify(toStore) );
        console.log( "Object stored!" );
    }
    else{
        console.log( "Current browser does not support HTML5 local storage" );
    }
}

function retrieve(){
    for( var i = 0, len = localStorage.length; i < len; i++ ){
        var key = localStorage.key(i);
        var value = localStorage[key];
        var retObj = JSON.parse(value);
        console.log( "Retrieved item with the follow attributes" + retObj.myTitle + ":::" + retObj.myStart + ":::" + retObj.myEnd + ":::" + retObj.myColor);
        doOnload( retObj.myTitle, retObj.myStart, retObj.myEnd, retObj.myColor );
    }
}

var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope) {
    $scope.submit = function() {
        doSubmit( eName.value, ( sDate.value + "T" + sTime.value + ":00" ), ( eDate.value + "T" + sTime.value + ":00" ), "blue" );
    } 
});
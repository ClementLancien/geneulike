/*global  angular:false */
/*jslint sub: true, browser: true, indent: 4, vars: true, nomen: true */
'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module('geneulike', [
    'geneulike.resources',
    'angular-carousel',
    'ngDialog',
    'ngTableToCsv',
    'ngFileUpload',
    'ngSanitize',
    'ngCookies',
    'angular-js-xlsx',
    'ngRoute','angular-venn','angularFileUpload',
    'ui.bootstrap',
    'datatables',
    'ui.tree',
    'uuid',
    'ngTable',
    'angucomplete-alt']).

config(['$routeProvider','$logProvider',
    function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/home.html',
            controller: 'appCtrl'
        });

        $routeProvider.when('/help', {
            templateUrl: 'views/help.html',
            controller: 'noCtrl'
        });

         $routeProvider.when('/jobresults', {
            templateUrl: 'views/jobresults.html',
            controller: 'jobresultsCtrl'
        });

        $routeProvider.when('/admin', {
            templateUrl: 'views/admin.html',
            controller: 'adminCtrl'
        });

        $routeProvider.when('/query', {
            templateUrl: 'views/query.html',
            controller: 'queryCtrl'
        });

        $routeProvider.when('/about', {
            templateUrl: 'views/about.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/tools', {
            templateUrl: 'views/tools.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/jobs', {
            templateUrl: 'views/jobs.html',
            controller: 'jobsCtrl'
        });

        $routeProvider.when('/involved', {
            templateUrl: 'views/involved.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/recover', {
            templateUrl: 'views/recover.html',
            controller: 'recoverCtrl'
        });
        $routeProvider.when('/password_recover', {
            templateUrl: './views/password_recover.html',
            controller: 'passwordRecoverCtrl'
        });

        $routeProvider.when('/ontologies', {
            templateUrl: 'views/ontologies.html',
            controller: 'ontologiesCtrl'
        });

        $routeProvider.when('/compare', {
            templateUrl: 'views/compare.html',
            controller: 'compareCtrl'
        });

        $routeProvider.when('/convert', {
            templateUrl: 'views/convert.html',
            controller: 'convertCtrl'
        });

        $routeProvider.when('/search', {
            templateUrl: 'views/search.html',
            controller: 'searchCtrl'
        });

        $routeProvider.when('/tutorial', {
            templateUrl: 'views/tutorials.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/downloads', {
            templateUrl: 'views/downloads.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/browse', {
            templateUrl: 'views/browse.html',
            controller: 'browseCtrl'
        });

        $routeProvider.when('/database', {
            templateUrl: 'views/database.html',
            controller: 'databaseCtrl'
        });

        $routeProvider.when('/predict', {
            templateUrl: 'views/prediction.html',
            controller: 'noCtrl'
        });

         $routeProvider.when('/enrich', {
            templateUrl: 'views/enrich.html',
            controller: 'enrichCtrl'
        });

         $routeProvider.when('/dist', {
            templateUrl: 'views/dist.html',
            controller: 'distCtrl'
        });

        $routeProvider.when('/prio', {
            templateUrl: 'views/prio.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/signin', {
            templateUrl: 'views/signin.html',
            controller: 'signinCtrl'
        });

        $routeProvider.when('/user/:id', {
            templateUrl: 'views/user.html',
            controller: 'userInfoCtrl'
        });

        $routeProvider.when('/user/:id/myproject', {
            templateUrl: 'views/user_project.html',
            controller: 'userprojectCtrl'
        });

        $routeProvider.when('/user/:id/create_new', {
            templateUrl: 'views/create_new.html',
            controller: 'createCtrl'
        });

        $routeProvider.when('/tutorials/overview', {
            templateUrl: 'tutorial/overview.html',
            controller: 'noCtrl'
        });

         $routeProvider.when('/tutorials/register', {
            templateUrl: 'tutorial/register.html',
            controller: 'noCtrl'
        });

          $routeProvider.when('/tutorials/logging', {
            templateUrl: 'tutorial/logging.html',
            controller: 'noCtrl'
        });

           $routeProvider.when('/tutorials/spreadsheet', {
            templateUrl: 'tutorial/spreadsheet.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/tutorials/upload', {
            templateUrl: 'tutorial/upload.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/tutorials/update', {
            templateUrl: 'tutorial/update.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/tutorials/public', {
            templateUrl: 'tutorial/public.html',
            controller: 'noCtrl'
        });

        $routeProvider.when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        });
       $routeProvider.otherwise({
            redirectTo: '/'
        });
}]).

config(['$httpProvider', function ($httpProvider){
    $httpProvider.interceptors.push( function($q, $window){
        return {
            'request': function (config) {
                 config.headers = config.headers || {};
                 if ($window.sessionStorage.token) {
                     config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                 }
                 return config;
            },
            'response': function(response){
                return response;
            },
            'responseError': function(rejection){
                if(rejection.status == 401) {
                    // Route to #/login
                    ////console.log('Rentre chez toi')
                    location.replace('#/');
                }
                return $q.reject(rejection);
            }
        };
    });
}]);

app.controller('noCtrl',
    function ($scope,$rootScope, $log, Auth, User,$location) {

});


app.controller('appCtrl',
    function ($scope,$rootScope, $log, Auth, User,$cookieStore, $location,Dataset) {
        $scope.msg = null;

        var user = Auth.getUser();
        if(user !== null && user !== undefined) {
            var cookie_selectID =  $cookieStore.get('selectedID');
           var cookie_jobID =  $cookieStore.get('jobID');
           if (cookie_selectID != undefined && cookie_selectID != ''){
            var user_seletedID = user.selectedID.split(',');
            var cookies_list = cookie_selectID.split(',');
            var job_list = cookie_jobID.split(',');

            
            for(var i=0;i<cookies_list.length; i++){
              var index = user_seletedID.indexOf(cookies_list[i]);
              if (index == -1){
                user_seletedID.push(cookies_list[i]);
              }
            }
            user.selectedID = user_seletedID.join(',');
            user.$save({'uid': user.id}).then(function(data){
                user = data;
                $cookieStore.put('selectedID',null)
            });
           }

           if (cookie_jobID != undefined && cookie_jobID != ''){
              for(var i=0;i < job_list.length; i++){
                var index = user_seletedID.indexOf(job_list[i]);
                if (index > -1){
                  user_seletedID.push(job_list[i]);
                }
              }
              user.jobID = user_seletedID.join(',');
              user.$save({'uid': user.id}).then(function(data){
                  user = data;
                  $cookieStore.put('jobID',null)
              });
           }
           
        }

        if(user === null || user === undefined) {
            User.is_authenticated({},{}).$promise.then(function(data){
                $rootScope.$broadcast('loginCtrl.login', data);
                Auth.setUser(data);
            });

        }


         
        Dataset.get({'filter':'private','collection':'projects','field':'status', 'obs':true}).$promise.then(function(data){
            $scope.last_sign = data.request;
            //console.log($scope.last_sign);
        });

        $(document).ready(function(){
  
        var $randomnbr = $('.nbr');
        var $timer= 15;
        var $it;
        var $data = 0;
        var index;
        var change;
        var letters = ["W", "e", "l", "c", "o", "m", "e", "&nbsp;", "t", "o", "&nbsp;", "G", "e", "n", "e", "U", "L", "i", "k", "e"];

  //var letters = ["W", "e", "l", "c", "o", "m", "e", "t" "o", "G", "e", "n", "e", "u", "l", "i", "k", "e"];
  
        $randomnbr.each(function(){
      
        change = Math.round(Math.random()*100);
        $(this).attr('data-change', change);
    
        });
  
        function random(){
            return Math.round(Math.random()*9);
        };
  
        function select(){
            return Math.round(Math.random()*$randomnbr.length+1);
        };
  
        function value(){
            $('.nbr:nth-child('+select()+')').html(''+random()+'');
            $('.nbr:nth-child('+select()+')').attr('data-number', $data);
            $data++;
    
            $randomnbr.each(function(){
            if(parseInt($(this).attr('data-number')) > parseInt($(this).attr('data-change'))){
                index = $('.ltr').index(this);
                $(this).html(letters[index]);
                $(this).removeClass('nbr');
            }
            });
    
        };
  
        $it = setInterval(value, $timer);
    
});

        // var text = $(".split");

        // var split = new SplitText(text);

        // function random(min, max){
        //     return (Math.random() * (max - min)) + min;
        // }

        // $(split.chars).each(function(i){
        // TweenMax.from($(this), 2.5, {
        // opacity: 0,
        // x: random(-500, 500),
        // y: random(-500, 500),
        // z: random(-500, 500),
        // scale: .1,
        // delay: i * .02,
        // yoyo: true,
        // repeat: false,
        // repeatDelay: 10
        // });
        // });   


        //INSERT FUNCTION GET LAST
        //Get last updated signature on TOXsIgN

});

app.controller('queryCtrl',
    function ($scope,$rootScope, Auth, User, Dataset, Search, $filter, ngTableParams) {
        $scope.selected_type = '';
        $scope.selected_field = {};
        $scope.search_history = [];
        $scope.selected_querymode = {};
        $scope.research = '';
        $scope.query = {};
        $scope.querymode = '';

        $scope.pfrom=0;
        $scope.sfrom=0;
        $scope.stfrom=0;
        $scope.lfrom=0;

        $scope.selected_field.projects='';
        $scope.selected_field.studies='';
        $scope.selected_field.strategies='';
        $scope.selected_field.lists='';


        $scope.param_add = function() {
          // console.log($scope.selected_field);
          // console.log($scope.selected_type);

            number_query +=1
            console.log("number_query");
            console.log(number_query);
            if($scope.research == ''){
                $scope.research="*";
            }
            else{
              $scope.research ="*"+$scope.research+"*";
            }

            if($scope.selected_type == 'projects'){

                if ($scope.selected_field.projects == ''){
                    var value = '(_type:'+$scope.selected_type+' AND '+'_all'+':'+$scope.research+')';
                    //var value=[{'_type': str($scope.selected_type)}, {'selector' : 'AND'}, {'field': '_all', {'search' : str($scope.research)}}]
                }
                else{
                    var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.projects+':'+$scope.research+')';            
                }
            }
            else if($scope.selected_type == 'studies'){
                if($scope.selected_field.studies == ''){
                    var value = '(_type:'+$scope.selected_type+' AND '+'_all'+':'+$scope.research+')';
                }
                else{
                    var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.studies+':'+$scope.research+')';  
                }
                
            }
            else if($scope.selected_type == 'strategies'){

                if($scope.selected_field.strategies== ''){
                    var value = '(_type:'+$scope.selected_type+' AND '+'_all'+':'+$scope.research+')';
                    
                }
                else{
                    var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.strategies+':'+$scope.research+')';
                }
            }
            else if($scope.selected_type == 'lists'){

                if($scope.selected_field.lists== ''){
                    var value = '(_type:'+$scope.selected_type+' AND '+'_all'+':'+$scope.research+')';
                    
                }
                else{
                    var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.lists+':'+$scope.research+')';
                }
            }
            else if($scope.selected_type == '_all'){
              // console.log("we are here");
                var value = '(_all:'+$scope.research+')';
                // console.log(value);
            }

            // console.log(value);
            // console.log($scope.selected_field);
            if($scope.selected_querymode.mode == undefined){
              console.log("ADD to dico");
              $scope.query[value] = 'AND';
              $scope.selected_querymode.mode = 'AND';
            }
            else {
              $scope.query[value] = $scope.selected_querymode.mode;
            }
            $scope.selected_type = '';
            $scope.selected_field = {};
            $scope.research = '';
            $scope.selected_field.projects='';
            $scope.selected_field.studies='';
            $scope.selected_field.strategies='';
            $scope.selected_field.lists='';

        };
        // $scope.param_add = function() {
        //   console.log($scope.selected_field);
        //     if($scope.selected_type == 'projects'){
        //       var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.projects+':'+$scope.research+')';
        //     }
        //     if($scope.selected_type == 'studies'){
        //       var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.studies+':'+$scope.research+')';
        //     }
        //     if($scope.selected_type == 'signatures'){
        //       var value = '(_type:'+$scope.selected_type+' AND '+$scope.selected_field.signatures+':'+$scope.research+')';
        //     }
        //      if($scope.selected_type == 'all'){
        //       var value = $scope.research;
        //     }
        //     console.log(value);
        //     console.log($scope.selected_field);
        //     if($scope.selected_querymode.mode == undefined){
        //       console.log("ADD to dico");
        //       $scope.query[value] = 'AND';
        //       $scope.selected_querymode.mode = 'AND';
        //     }
        //     else {
        //       $scope.query[value] = $scope.selected_querymode.mode;
        //     }
        //     $scope.selected_type = '';
        //     $scope.selected_field = {};
        //     $scope.research = '';

        // };

        $scope.search_history_item = function(item) {
            $scope.query = item;
            $scope.search(false);
        }

        $scope.more = function(type){
            if(type == 'projects'){
                $scope.pfrom=$scope.pfrom+24
            }
            else if(type == 'studies'){
                $scope.sfrom=$scope.sfrom+24       
            }
            else if(type == 'strategies'){
                $scope.stfrom= $scope.stfrom+24
            }
            else{
                $scope.lfrom=$scope.lfrom+24   
              }
            
            var query_piece = '';//'status:public ';
            for(var filter in $scope.query){
                query_piece = query_piece +$scope.query[filter]+' '+filter+' ';
            }

            query_piece=query_piece.substr(4);
                // console.log(query_piece);
            console.log(query_piece);
            Search.search_index({"query":query_piece, 'query_dico':$scope.query,'number_query':number_query, 'pfrom':$scope.pfrom, 'sfrom':$scope.sfrom, 'stfrom':$scope.sgfrom, 'lfrom' : $scope.lfrom}).$promise.then(function(data){
                console.log("OKKKKK");
                console.log(data);
                console.log(number_query);
                console.log(data['query'] == '(_all:*) ');
                if(data['query'] == '(_all:*) ' ){
                    console.log("here");
                    $location.path('/database'); 
                }

                  // }

                else if (data['number_query'] == '1'){
                    console.log("=====1")
                    console.log(data);
                    $scope.projects = [];
                    $scope.studies = [];
                    $scope.strategies = [];
                    $scope.lists=[];
                    $scope.search_results = data['page'];
                    $scope.results = $scope.search_results.hits.hits;

                    if (query_piece.includes('projects') && data['number'] != 0){
                        $scope.projects_number= ''+data['number'];
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.projects.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('studies') && data['number'] != 0){
                        $scope.studies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result'; 
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.studies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('strategies') && data['number'] != 0){
                        $scope.strategies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.strategies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('lists') && data['number'] != 0){
                        $scope.lists_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.lists.push($scope.results[i]['_source']);
                        }
                    }
                    
                    else{
                        $scope.lists_number= 'No Result';
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                    }


                      // for(var i =0;i<$scope.results.length;i++){
                      //   if($scope.results[i]['_type'] == 'projects'){
                      //     $scope.projects.push($scope.results[i]['_source']);
                      //   //$scope.project_number ++;
                      //   }
                      //   if($scope.results[i]['_type'] == 'studies'){
                      //     $scope.studies.push($scope.results[i]['_source']);
                      //   //$scope.studies_number ++;
                      //   }
                      //   if($scope.results[i]['_type'] == 'strategies'){
                      //     $scope.signatures.push($scope.results[i]['_source']);
                      //   //$scope.signatures_number ++;
                      //   }

                      // }

                    }
                    else{



                        $scope.projects = [];
                        $scope.studies = [];
                        $scope.strategies = [];
                        $scope.lists = [];
                        $scope.results="true";

                        $scope.projects_number = data['number_project'];
                        $scope.studies_number=  data['number_study'];                  
                        $scope.strategies_number = data['number_study'];
                        $scope.lists_number=data['number_list'];


                        if (data['projects'] != null){
                            $scope.search_projects = data['projects'].hits.hits;
                            for(var i =0;i<$scope.search_projects.length;i++){
                                $scope.projects.push($scope.search_projects[i]['_source']);
                            }
                        }
                        else{
                            $scope.projects_number="No Result";
                        }

                        if (data['studies'] != null){
                            $scope.search_studies = data['studies'].hits.hits;
                            for(var i =0;i<$scope.search_studies.length;i++){
                                $scope.studies.push($scope.search_studies[i]['_source']);
                            }
                        }
                        else{
                            $scope.studies_number="No Result";
                        }


                        if (data['strategies'] != null){
                            $scope.search_signatures = data['strategies'].hits.hits;
                            for(var i =0;i<$scope.search_strategies.length;i++){
                                $scope.strategies.push($scope.search_strategies[i]['_source']);
                            }
                        }
                        else{
                            $scope.strategies_number="No Result";
                        }

                        if (data['lists'] != null){
                            $scope.search_lists = data['lists'].hits.hits;
                            for(var i =0;i<$scope.search_lists.length;i++){
                                $scope.lists.push($scope.search_lists[i]['_source']);
                            }
                        }
                        else{
                            $scope.lists_number="No Result";
                        }

                        console.log($scope.projects);
                        console.log($scope.studies);
                        console.log($scope.signatures);


                    }

            });

        };
        $scope.back = function(type){



            if(type == 'projects'){
                $scope.pfrom=$scope.pfrom-24
            }
            else if(type == 'studies'){
                $scope.sfrom=$scope.sfrom-24       
            }
            else if(type == 'strategies'){
                $scope.stfrom= $scope.stfrom-24
            }
            else{
                $scope.lfrom=$scope.lfrom-24   
              }
            
            var query_piece = '';//'status:public ';
            for(var filter in $scope.query){
                query_piece = query_piece +$scope.query[filter]+' '+filter+' ';
            }

            query_piece=query_piece.substr(4);
                // console.log(query_piece);
            console.log(query_piece);
            Search.search_index({"query":query_piece, 'query_dico':$scope.query,'number_query':number_query, 'pfrom':$scope.pfrom, 'sfrom':$scope.sfrom, 'stfrom':$scope.sgfrom, 'lfrom' : $scope.lfrom}).$promise.then(function(data){
                console.log("OKKKKK");
                console.log(data);
                console.log(number_query);
                console.log(data['query'] == '(_all:*) ');
                if(data['query'] == '(_all:*) ' ){
                    console.log("here");
                    $location.path('/database'); 
                }

                  // }

                else if (data['number_query'] == '1'){
                    console.log("=====1")
                    console.log(data);
                    $scope.projects = [];
                    $scope.studies = [];
                    $scope.strategies = [];
                    $scope.lists=[];
                    $scope.search_results = data['page'];
                    $scope.results = $scope.search_results.hits.hits;

                    if (query_piece.includes('projects') && data['number'] != 0){
                        $scope.projects_number= ''+data['number'];
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.projects.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('studies') && data['number'] != 0){
                        $scope.studies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result'; 
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.studies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('strategies') && data['number'] != 0){
                        $scope.strategies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.strategies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('lists') && data['number'] != 0){
                        $scope.lists_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.lists.push($scope.results[i]['_source']);
                        }
                    }
                    
                    else{
                        $scope.lists_number= 'No Result';
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                    }


                      // for(var i =0;i<$scope.results.length;i++){
                      //   if($scope.results[i]['_type'] == 'projects'){
                      //     $scope.projects.push($scope.results[i]['_source']);
                      //   //$scope.project_number ++;
                      //   }
                      //   if($scope.results[i]['_type'] == 'studies'){
                      //     $scope.studies.push($scope.results[i]['_source']);
                      //   //$scope.studies_number ++;
                      //   }
                      //   if($scope.results[i]['_type'] == 'strategies'){
                      //     $scope.signatures.push($scope.results[i]['_source']);
                      //   //$scope.signatures_number ++;
                      //   }

                      // }

                    }
                    else{



                        $scope.projects = [];
                        $scope.studies = [];
                        $scope.strategies = [];
                        $scope.lists = [];
                        $scope.results="true";

                        $scope.projects_number = data['number_project'];
                        $scope.studies_number=  data['number_study'];                  
                        $scope.strategies_number = data['number_study'];
                        $scope.lists_number=data['number_list'];


                        if (data['projects'] != null){
                            $scope.search_projects = data['projects'].hits.hits;
                            for(var i =0;i<$scope.search_projects.length;i++){
                                $scope.projects.push($scope.search_projects[i]['_source']);
                            }
                        }
                        else{
                            $scope.projects_number="No Result";
                        }

                        if (data['studies'] != null){
                            $scope.search_studies = data['studies'].hits.hits;
                            for(var i =0;i<$scope.search_studies.length;i++){
                                $scope.studies.push($scope.search_studies[i]['_source']);
                            }
                        }
                        else{
                            $scope.studies_number="No Result";
                        }


                        if (data['strategies'] != null){
                            $scope.search_signatures = data['strategies'].hits.hits;
                            for(var i =0;i<$scope.search_strategies.length;i++){
                                $scope.strategies.push($scope.search_strategies[i]['_source']);
                            }
                        }
                        else{
                            $scope.strategies_number="No Result";
                        }

                        if (data['lists'] != null){
                            $scope.search_lists = data['lists'].hits.hits;
                            for(var i =0;i<$scope.search_lists.length;i++){
                                $scope.lists.push($scope.search_lists[i]['_source']);
                            }
                        }
                        else{
                            $scope.lists_number="No Result";
                        }

                        console.log($scope.projects);
                        console.log($scope.studies);
                        console.log($scope.signatures);


                    }

          // $scope.max = $scope.max - 100;
          // var query_piece = 'status:public ';
          //   for(var filter in $scope.query){
          //       query_piece = query_piece +$scope.query[filter]+' '+filter+' '
          //     //console.log($scope.parameters[i]);
          //   }
          //   //console.log(query_piece)
          // Search.search_index({"query":query_piece,'from':$scope.max}).$promise.then(function(data){
          //       $scope.search_results = data;
          //       $scope.chemicalList = [];
          //       $scope.check = []
                
          //       $scope.signatures = []
          //       $scope.results = $scope.search_results.hits.hits;
          //       for(var i=0;i<$scope.results.length;i++){
          //         var checkd = $scope.signatures.indexOf($scope.results[i]._source);
          //         if(checkd === -1) {
          //           $scope.signatures.push($scope.results[i]._source);
          //         }

          //       }
                ////console.log($scope.signatures);
                ////console.log($scope.results._source.studies.id);
                ////console.log($scope.results._source.studies[0].id);
            });

        };



        $scope.convert_timestamp_to_date = function(UNIX_timestamp){
          if(UNIX_timestamp=='' || UNIX_timestamp===null || UNIX_timestamp===undefined) { return '';}
          var a = new Date(UNIX_timestamp*1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        };
        $scope.param_del = function(key) {
            delete $scope.query[key];
        };

        $scope.search_history_item = function(item) {
            $scope.parameters = item;
            $scope.search(false);
        }


        $scope.search = function(do_save) {
            if(do_save) {
                $scope.search_history.push(JSON.parse(JSON.stringify($scope.query)));
            }


            var query_piece = '';//'status:public ';
            for(var filter in $scope.query){
                query_piece = query_piece +$scope.query[filter]+' '+filter+' ';
            }

            query_piece=query_piece.substr(4);
                // console.log(query_piece);
            console.log(query_piece);
            Search.search_index({"query":query_piece, 'query_dico':$scope.query,'number_query':number_query, 'pfrom':$scope.pfrom, 'sfrom':$scope.sfrom, 'stfrom':$scope.sgfrom, 'lfrom' : $scope.lfrom}).$promise.then(function(data){
                console.log("OKKKKK");
                console.log(data);
                console.log(number_query);
                console.log(data['query'] == '(_all:*) ');
                if(data['query'] == '(_all:*) ' ){
                    console.log("here");
                    $location.path('/database'); 
                }

                  // }

                else if (data['number_query'] == '1'){
                    console.log("=====1")
                    console.log(data);
                    $scope.projects = [];
                    $scope.studies = [];
                    $scope.strategies = [];
                    $scope.lists=[];
                    $scope.search_results = data['page'];
                    $scope.results = $scope.search_results.hits.hits;

                    if (query_piece.includes('projects') && data['number'] != 0){
                        $scope.projects_number= ''+data['number'];
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.projects.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('studies') && data['number'] != 0){
                        $scope.studies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        $scope.lists_number = 'No Result'; 
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.studies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('strategies') && data['number'] != 0){
                        $scope.strategies_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.lists_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.strategies.push($scope.results[i]['_source']);
                        }
                    }

                    else if(query_piece.includes('lists') && data['number'] != 0){
                        $scope.lists_number= data['number'];
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                        for(var i =0;i<$scope.results.length;i++){
                            $scope.lists.push($scope.results[i]['_source']);
                        }
                    }
                    
                    else{
                        $scope.lists_number= 'No Result';
                        $scope.projects_number = 'No Result';
                        $scope.studies_number = 'No Result';
                        $scope.strategies_number = 'No Result';
                    }

                }
                else{



                    $scope.projects = [];
                    $scope.studies = [];
                    $scope.strategies = [];
                    $scope.lists = [];
                    $scope.results="true";

                    $scope.projects_number = data['number_project'];
                    $scope.studies_number=  data['number_study'];                  
                    $scope.strategies_number = data['number_study'];
                    $scope.lists_number=data['number_list'];


                    if (data['projects'] != null){
                        $scope.search_projects = data['projects'].hits.hits;
                        for(var i =0;i<$scope.search_projects.length;i++){
                            $scope.projects.push($scope.search_projects[i]['_source']);
                        }
                    }
                    else{
                        $scope.projects_number="No Result";
                    }

                    if (data['studies'] != null){
                        $scope.search_studies = data['studies'].hits.hits;
                        for(var i =0;i<$scope.search_studies.length;i++){
                            $scope.studies.push($scope.search_studies[i]['_source']);
                        }
                    }
                    else{
                        $scope.studies_number="No Result";
                    }


                    if (data['strategies'] != null){
                        $scope.search_signatures = data['strategies'].hits.hits;
                        for(var i =0;i<$scope.search_strategies.length;i++){
                            $scope.strategies.push($scope.search_strategies[i]['_source']);
                        }
                    }
                    else{
                        $scope.strategies_number="No Result";
                    }

                    if (data['lists'] != null){
                        $scope.search_lists = data['lists'].hits.hits;
                        for(var i =0;i<$scope.search_lists.length;i++){
                            $scope.lists.push($scope.search_lists[i]['_source']);
                        }
                    }
                    else{
                        $scope.lists_number="No Result";
                    }

                    console.log($scope.projects);
                    console.log($scope.studies);
                    console.log($scope.signatures);


                }
            });
};















        //     var query_piece = 'status:public ';
        //     for(var filter in $scope.query){
        //         query_piece = query_piece +$scope.query[filter]+' '+filter+' '
        //       //console.log($scope.parameters[i]);
        //     }
        //     console.log(query_piece)
        //     Search.search_index({"query":query_piece,'from':0}).$promise.then(function(data){
        //         $scope.projects = [];
        //         $scope.studies = [];
        //         $scope.assays = [];
        //         $scope.signatures = [];
        //         $scope.project_number = 0
        //         $scope.studies_number = 0
        //         $scope.assay_number = 0
        //         $scope.signatures_number = 0
        //         $scope.search_results = data;
        //         console.log(data);
        //         $scope.results = $scope.search_results.hits.hits;
        //         console.log($scope.results);
        //         console.log($scope.search_results.hits);

        //         for(var i =0;i<$scope.results.length;i++){
        //           if($scope.results[i]['_type'] == 'projects'){
        //             $scope.projects.push($scope.results[i]['_source']);
        //             $scope.project_number ++;
        //           }
        //           if($scope.results[i]['_type'] == 'studies'){
        //             $scope.studies.push($scope.results[i]['_source']);
        //             $scope.studies_number ++;
        //           }
        //           if($scope.results[i]['_type'] == 'assays'){
        //             $scope.assays.push($scope.results[i]['_source']);
        //             $scope.assay_number ++;
        //           }
        //           if($scope.results[i]['_type'] == 'signatures'){
        //             $scope.signatures.push($scope.results[i]['_source']);
        //             $scope.signatures_number ++;
        //           }

        //         }
        //         console.log($scope.results);
        //     });
        // }
});

app.controller('searchCtrl',
    function($scope, $rootScope, $routeParams, $log, $location, $window, User, Auth, SearchHits) {
        var hits = SearchHits.getHits();
        console.log(hits)
        $scope.nb_match = hits.hits.total
        $scope.search_result = hits.hits.hits;
        console.log($scope.search_result);
        $scope.projects = [];
        $scope.studies = [];
        $scope.assays = [];
        $scope.signatures = [];
        $scope.project_number = 0
        $scope.studies_number = 0
        $scope.assay_number = 0
        $scope.signatures_number = 0

        for(var i =0;i<$scope.search_result.length;i++){
          if($scope.search_result[i]['_type'] == 'projects'){
            $scope.projects.push($scope.search_result[i]['_source']);
            $scope.project_number ++;
          }
          if($scope.search_result[i]['_type'] == 'studies'){
            $scope.studies.push($scope.search_result[i]['_source']);
            $scope.studies_number ++;
          }
          if($scope.search_result[i]['_type'] == 'assays'){
            $scope.assays.push($scope.search_result[i]['_source']);
            $scope.assay_number ++;
          }
          if($scope.search_result[i]['_type'] == 'signatures'){
            $scope.signatures.push($scope.search_result[i]['_source']);
            $scope.signatures_number ++;
          }

        }

});

app.controller('distCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset, $window,$cookieStore, $location) {
        $scope.msg = "Dashboard Tools";

        $scope.user = null
        $scope.user = Auth.getUser();

        if($window.sessionStorage.token) {
            $scope.token = $window.sessionStorage.token;
        }

        $scope.signatures = [];
        $scope.selected = ""
        $scope.msg = "Dashboard Tools";
        $scope.filter ="pvalue";
        $scope.adjust_filter ="lt";
        $scope.value_filter =0.01;
        $scope.job_name = "";
        $scope.resultGo="";
        $scope.labels = [];
        $scope.series = [];
        $scope.filter_val = {};
        $scope.size = 0;
        console.log($scope.user);

      $scope.add = function(){
        $scope.filter_val[$scope.filter]={'param':$scope.adjust_filter,'value':$scope.value_filter,'name':$scope.job_name};
        $scope.filter ="pvalue";
        $scope.adjust_filter ="lt";
        $scope.value_filter =0.01;
        $scope.job_name = ""
        $scope.size = Object.keys($scope.filter_val).length;

      };

       $scope.param_del = function(key) {

          delete $scope.filter_val[key];
          $scope.size = Object.keys($scope.filter_val).length;
      };

      if($scope.user == undefined || $scope.user == null){
        $scope.selected = $cookieStore.get('selectedID').split(',');
      }
      else{
        $scope.selected = $scope.user.selectedID.split(',');
        console.log($scope.selected);
      }
      for(var i=0;i<$scope.selected.length;i++){
          console.log($scope.selected[i]);
          console.log(i);
          Dataset.get({'filter':$scope.selected[i],'from':'None','to': 'None','collection':'signatures','field':'id'}).$promise.then(function(data){
            if(data.request != undefined){
              $scope.signatures.push(data.request);
            }
            console.log($scope.signatures);
          });
        }

      $scope.run = function(signature){
        var user_id = "";
        if ($scope.user != null){
          user_id = $scope.user.id;
        }
        else {
          user_id = "None"
        }
        var args =  $scope.filter+','+$scope.adjust_filter+','+$scope.value_filter
        Dataset.run({'uid':user_id, 'signature':signature, 'tool':'distance analysis', 'arguments':args,'name':$scope.job_name}).$promise.then(function(data){
          console.log(data);
          if ($scope.user != null){
            if ($scope.user.jobID == undefined){
              $scope.user.jobID = "";
            }
            var list_jobID = $scope.user.jobID.split(',');
            list_jobID.push(data.id);
            $scope.user.jobID = list_jobID.join(',');
            $scope.user.$save({'uid': $scope.user.id}).then(function(data){
              $scope.user = data;
            });
          }
          else {
            if ($cookieStore.get('jobID') != undefined){
              var list_jobID = $cookieStore.get('jobID').split(',');
            } else{
              var list_jobID = [];
            }
            list_jobID.push(data.id);
            $cookieStore.put('jobID',list_jobID.join(','));
          }
          $location.path('/jobs');;
        });
      }

});


app.controller('enrichCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset, $location,$window,$cookieStore, ngTableParams, $filter) {
      $scope.msg = "Dashboard Tools";

        $scope.user = null
        $scope.user = Auth.getUser();

        if($window.sessionStorage.token) {
            $scope.token = $window.sessionStorage.token;
        }

        $scope.signatures = [];
        $scope.selected = ""
        $scope.msg = "Dashboard Tools";
        $scope.filter ="pvalue";
        $scope.adjust_filter ="lt";
        $scope.value_filter =0.01;
        $scope.job_name = "";
        $scope.resultGo="";
        $scope.labels = [];
        $scope.series = [];
        $scope.filter_val = {};
        $scope.size = 0;
        console.log($scope.user);

      $scope.add = function(){
        $scope.filter_val[$scope.filter]={'param':$scope.adjust_filter,'value':$scope.value_filter,'name':$scope.job_name};
        $scope.filter ="pvalue";
        $scope.adjust_filter ="lt";
        $scope.value_filter =0.01;
        $scope.job_name = ""
        $scope.size = Object.keys($scope.filter_val).length;

      };

       $scope.param_del = function(key) {

          delete $scope.filter_val[key];
          $scope.size = Object.keys($scope.filter_val).length;
      };

      if($scope.user == undefined || $scope.user == null){
        $scope.selected = $cookieStore.get('selectedID').split(',');
      }
      else{
        $scope.selected = $scope.user.selectedID.split(',');
        console.log($scope.selected);
      }
      for(var i=0;i<$scope.selected.length;i++){
          console.log($scope.selected[i]);
          console.log(i);
          Dataset.get({'filter':$scope.selected[i],'from':'None','to': 'None','collection':'signatures','field':'id'}).$promise.then(function(data){
            if(data.request != undefined){
              $scope.signatures.push(data.request);
            }
            console.log($scope.signatures);
          });
        }

      $scope.run = function(signature){
        var user_id = "";
        if ($scope.user != null){
          user_id = $scope.user.id;
        }
        else {
          user_id = "None"
        }
        var args =  $scope.filter+','+$scope.adjust_filter+','+$scope.value_filter
        Dataset.run({'uid':user_id, 'signature':signature, 'tool':'functional analysis', 'arguments':args,'name':$scope.job_name}).$promise.then(function(data){
          console.log(data);
          if ($scope.user != null){
            if ($scope.user.jobID == undefined){
              $scope.user.jobID = "";
            }
            var list_jobID = $scope.user.jobID.split(',');
            list_jobID.push(data.id);
            $scope.user.jobID = list_jobID.join(',');
            $scope.user.$save({'uid': $scope.user.id}).then(function(data){
              $scope.user = data;
            });
          }
          else {
            if ($cookieStore.get('jobID') != undefined){
              var list_jobID = $cookieStore.get('jobID').split(',');
            } else{
              var list_jobID = [];
            }
            list_jobID.push(data.id);
            $cookieStore.put('jobID',list_jobID.join(','));
          }
          $location.path('/jobs');;
        });
      }

});

app.controller('jobresultsCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset, $location, ngTableParams, $filter) {

      var params = $location.search();
      Dataset.getjob({'job_list':"",'jid':params['job']}).$promise.then(function(data){
        $scope.job = data.jobs;
        console.log($scope.job);
        Dataset.readresult({'job':$scope.job.id}).$promise.then(function(datas){
          $scope.resultcc = datas.results;
          $scope.Math = window.Math;
          if ($scope.job.tool == 'distance analysis'){
            $scope.conditionTable = new ngTableParams({
              page: 1,
              count: 50,
          },
           {
              total: $scope.resultcc.length,
              getData: function ($defer, params) {
                  $scope.datacc = params.sorting() ? $filter('orderBy')($scope.resultcc, params.orderBy()) : $scope.resultcc;
                  $scope.datacc = params.filter() ? $filter('filter')($scope.datacc, params.filter()) : $scope.datacc;
                  $scope.datacc = $scope.datacc.slice((params.page() - 1) * params.count(), params.page() * params.count());
                  $defer.resolve($scope.datacc);
              }
          });

          }
          if ($scope.job.tool == 'functional analysis'){
            $scope.resultGo = datas.Bp;
                console.log(datas);
                $scope.conditionTable = new ngTableParams({
                    page: 1,
                    count: 50,
                },
                 {
                    total: $scope.resultGo.length,
                    getData: function ($defer, params) {
                        $scope.data = params.sorting() ? $filter('orderBy')($scope.resultGo, params.orderBy()) : $scope.resultGo;
                        $scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
                        $scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.data);
                    }
                });

                $scope.resultMF = datas.Mf;
                $scope.MfTable = new ngTableParams({
                    page: 1,
                    count: 50,
                },
                 {
                    total: $scope.resultMF.length,
                    getData: function ($defer, params) {
                        $scope.datamf = params.sorting() ? $filter('orderBy')($scope.resultMF, params.orderBy()) : $scope.resultMF;
                        $scope.datamf = params.filter() ? $filter('filter')($scope.datamf, params.filter()) : $scope.datamf;
                        $scope.datamf = $scope.datamf.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.datamf);
                    }
                });

                $scope.resultcc = datas.Cc;
                $scope.ccTable = new ngTableParams({
                    page: 1,
                    count: 50,
                },
                 {
                    total: $scope.resultcc.length,
                    getData: function ($defer, params) {
                        $scope.datacc = params.sorting() ? $filter('orderBy')($scope.resultcc, params.orderBy()) : $scope.resultcc;
                        $scope.datacc = params.filter() ? $filter('filter')($scope.datacc, params.filter()) : $scope.datacc;
                        $scope.datacc = $scope.datacc.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.datacc);
                    }
                });

                $scope.resultds = datas.Disease;
                $scope.dsTable = new ngTableParams({
                    page: 1,
                    count: 50,
                },
                 {
                    total: $scope.resultds.length,
                    getData: function ($defer, params) {
                        $scope.datads = params.sorting() ? $filter('orderBy')($scope.resultds, params.orderBy()) : $scope.resultds;
                        $scope.datads = params.filter() ? $filter('filter')($scope.datads, params.filter()) : $scope.datads;
                        $scope.datads = $scope.datads.slice((params.page() - 1) * params.count(), params.page() * params.count());
                        $defer.resolve($scope.datads);
                    }
                });

          }
          
        });

      });


      $scope.get_Info = function(id){
        Dataset.get({'filter':id,'from':'None','to':'None','collection':'signatures','field':'id'}).$promise.then(function(result){
          var name = "";
          name = result.request.title;
          console.log(name);
          return name;
        });
      }

      $scope.show_dataset = function(id){
        $location.url('/browse?dataset='+id);
      };

      
     

});





app.controller('convertCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset, $window, $cookieStore, Upload, $location) {
        
        $scope.showGPL = function(){
            if($scope.selectFrom == "GPL"){
                return $scope.showFrom=true;
            }

        };

         $scope.GPLnnnannot = false;
         $scope.GPL1nnnannot = false;
        $scope.GPL2nnnannot = false;
        $scope.GPL3nnnannot = false;
        $scope.GPL4nnnannot = false;
        $scope.GPL5nnnannot = false;
        $scope.GPL6nnnannot = false;
        $scope.GPL7nnnannot = false;
        $scope.GPL8nnnannot = false;
        $scope.GPL9nnnannot = false;
        $scope.GPL10nnnannot = false;
        $scope.GPL11nnnannot = false;
        $scope.GPL12nnnannot = false;
        $scope.GPL13nnnannot = false;
        $scope.GPL14nnnannot = false;
        $scope.GPL15nnnannot = false;
        $scope.GPL16nnnannot = false;
        $scope.GPL17nnnannot = false;
        $scope.selectGPL = function(){
            if($scope.select.GPL == "GPLnnn"){
                return $scope.GPLnnnannot= true
            }
            else if($scope.select.GPL == "GPL1nnn"){
                return $scope.GPL1nnnannot= true;
            }
            else if($scope.select.GPL == "GPL1nnn"){
                return $scope.GPL2nnnannot= true;
            }
            else if($scope.select.GPL == "GPL2nnn"){
                return $scope.GPL2nnnannot= true;
            }
            else if($scope.select.GPL == "GPL3nnn"){
                return $scope.GPL3nnnannot= true;
            }
            else if($scope.select.GPL == "GPL4nnn"){
                return $scope.GPL4nnnannot= true;
            }
            else if($scope.select.GPL == "GPL5nnn"){
                return $scope.GPL5nnnannot= true;
            }
            else if($scope.select.GPL == "GPL6nnn"){
                return $scope.GPL6nnnannot= true;
            }
            else if($scope.select.GPL == "GPL7nnn"){
                return $scope.GPL7nnnannot= true;
            }
            else if($scope.select.GPL == "GPL8nnn"){
                return $scope.GPL8nnnannot= true;
            }
            else if($scope.select.GPL == "GPL9nnn"){
                return $scope.GPL9nnnannot= true;
            }
            else if($scope.select.GPL == "GPL10nnn"){
                return $scope.GPL10nnnannot= true;
            }
            else if($scope.select.GPL == "GPL11nnn"){
                return $scope.GPL11nnnannot= true;
            }
            else if($scope.select.GPL == "GPL12nnn"){
                return $scope.GPL12nnnannot= true;
            }
            else if($scope.select.GPL == "GPL13nnn"){
                return $scope.GPL13nnnannot= true;
            }
            else if($scope.select.GPL == "GPL14nnn"){
                return $scope.GPL14nnnannot= true;
            }
            
        }
        $scope.user = Auth.getUser();

        $scope.msg = "Dashboard Tools";
        $scope.listID = [];
        $scope.result="";
        $scope.species=0;
        $scope.way = ""

        $scope.user = null
        $scope.user = Auth.getUser();

        if($window.sessionStorage.token) {
            $scope.token = $window.sessionStorage.token;
        }

        // $scope.signatures = [];
        // $scope.selected = ""

        // if($scope.user == undefined || $scope.user == null){
        //   $scope.selected = $cookieStore.get('selectedID').split(',');
        // }
        // else{
        //   $scope.selected = $scope.user.selectedID.split(',');
        //   console.log($scope.selected);
        // }
        // console.log($scope.selected);
        // for(var i=0;i<$scope.selected.length;i++){
        //   console.log($scope.selected[i]);
        //   console.log(i);
        //   Dataset.get({'filter':$scope.selected[i],'from':'None','to': 'None','collection':'signatures','field':'id'}).$promise.then(function(data){
        //     $scope.signatures.push(data.request);
        //     console.log($scope.signatures);
        //   });
        // }


        // $scope.deleted = function(signature_id){
        //   // if($scope.user == undefined || $scope.user == null){
        //   //   $scope.selected = $cookieStore.get('selectedID').split(',');
        //   //   var index = $scope.selected.indexOf(signature_id);
        //   //   $scope.selected.splice(index, 1);
        //   //   var newcookie = $scope.selected.join(',');
        //   //   console.log(newcookie);
        //   //   $cookieStore.put('selectedID', newcookie);
        //   // }
        //   else{
        //     $scope.selected = $scope.user.selectedID.split(',');fredirect
        //     console.log($scope.selected);
        //     var index = $scope.selected.indexOf(signature_id);
        //     $scope.selected.splice(index, 1);
        //     $scope.user.selectedID = $scope.selected.join(',');
        //     $scope.user.$save({'uid': $scope.user.id}).then(function(data){
        //         $scope.user = data;
        //     });
        //   }
        // }

        $scope.toggleSelection2 = function toggleSelection2(genes) {
            $scope.listID = genes.split(',').join('\n');

        }


        $scope.convert = function(data){
          $scope.listID = $scope.listID.split('\n').join(',');
          console.log($scope.listID);
          Dataset.convert({'genes':$scope.listID,'way':$scope.way,'species':$scope.species}).$promise.then(function(data){
            $scope.convertedList = data.converted_list;
            $scope.result = data.converted_list;
          });
        };
});

app.controller('jobsCtrl',
    function ($scope,$rootScope, $log, Auth, User,$window, $cookieStore, Dataset, $location, ngDialog) {
        $scope.user = null
        $scope.user = Auth.getUser();


        if($window.sessionStorage.token) {
            $scope.token = $window.sessionStorage.token;
        }

        console.log($scope.user);

        $scope.jobRunning = [];
        $scope.selected = ""

        if($scope.user == undefined || $scope.user == null){
          $scope.jobRunning = $cookieStore.get('jobID').split(',');
        }
        else{
          $scope.jobRunning = $scope.user.jobID.split(',');
          console.log($scope.jobRunning);
        }

        Dataset.getjob({'job_list':$scope.jobRunning}).$promise.then(function(data){
          $scope.jobs = data.jobs;
        });

        $scope.show_info = function(job){
          ngDialog.open({ template: 'lofInfo', scope: $scope, className: 'ngdialog-theme-default',data: job});
        }
        



        $scope.convert_timestamp_to_date = function(UNIX_timestamp){
          if(UNIX_timestamp=='' || UNIX_timestamp===null || UNIX_timestamp===undefined) { return '';}
          var a = new Date(UNIX_timestamp*1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        };

      $scope.show_result = function(job){
        var oid = job._id;
        console.log(oid['$oid']);
        $location.url('/jobresults?job='+oid['$oid']);

      }

      $scope.del_job = function(job){
        if($scope.user == undefined || $scope.user == null){
          var index = $scope.jobRunning.indexOf(job.id)
          if (index != -1){
            $scope.jobRunning.splice(index, 1);
            $cookieStore.put('jobID',$scope.jobRunning.join(','));
            $scope.jobRunning = $cookieStore.get('jobID').split(',');
            Dataset.getjob({'job_list':$scope.jobRunning}).$promise.then(function(data){
                $scope.jobs = data.jobs;
              });
          }
        }
        else{
          var index = $scope.jobRunning.indexOf(job.id.toString());
          if (index != -1){
            $scope.jobRunning.splice(index, 1);
            $scope.user.jobID = $scope.jobRunning.join(',');
            $scope.user.$save({'uid': $scope.user.id}).then(function(data){
              $scope.user = data;
              $scope.jobRunning = $scope.user.jobID.split(',');
               Dataset.getjob({'job_list':$scope.jobRunning}).$promise.then(function(data){
                $scope.jobs = data.jobs;
              });
            });
          }
        }
      }

});



app.controller('loginCtrl',
    function ($scope, $rootScope, $routeParams, $log, $location, $window, User, Auth, $cookieStore) {
        $scope.msg = null;

      var params = $location.search();

      if(params['action'] !== undefined && params['action'] == 'confirm_email') {
          User.confirm_email({}, {'token': params['token']}).$promise.then(function(data){
            $scope.msg=data['msg'];
                                if(data['status'] == 'danger'){
                                  $scope.danger=data['msg'];
                                }
                                else if(data['status'] == 'success'){
                                  $scope.success=data['msg'];
                                }
                                else if(data['status'] == 'warning'){
                                  $scope.warning=data['msg'];
                                }
          });
      }
      else if(params['token'] !== undefined) {
          User.is_authenticated({},{'token': params['token']}).$promise.then(function(data){
              $rootScope.$broadcast('loginCtrl.login', data);
              Auth.setUser(data);
              $window.sessionStorage.token = params['token'];
              $location.search('token', null);
              $location.path('');
          });
      }

      $scope.remember = function(){
        $cookieStore.put('remember','1');
      }


      
      $scope.login = function(user) {

          User.login({},{'user_name': user.mail, 'user_password': user.password}).$promise.then(function(data){
              
              if(data['status'] == 'danger'){
                $scope.danger='Contact the administrator';
              }
              else if(data['status'] == 'success'){
                User.is_authenticated({},{'token': data['token']}).$promise.then(function(data){
                     $rootScope.$broadcast('loginCtrl.login', data);
                     Auth.setUser(data);
                     $window.sessionStorage.token = data.token;
                     $location.search('token', null);
                     $location.path('');
                 });
              }
              else if(data['status'] == 'warning'){
              $scope.warning=data['msg'];
              }
          });
    };
    $scope.loginDemo = function() {
          User.login({},{'user_name': 'geneulike@gmail.com', 'user_password':'0000'}).$promise.then(function(data){
              if(data['status'] == 'danger'){
                $scope.danger='Contact the administrator';
              }
              else if(data['status'] == 'success'){
                User.is_authenticated({},{'token': data['token']}).$promise.then(function(data){
                     $rootScope.$broadcast('loginCtrl.login', data);
                     Auth.setUser(data);
                     $window.sessionStorage.token = data.token;
                     $location.search('token', null);
                     $location.path('');
                 });
              }
              else if(data['status'] == 'warning'){
              $scope.warning=data['msg'];
              }
          });
    };


});

app.controller('signinCtrl',
    function ($scope,$rootScope, $log, Auth, User,$location) {

            $scope.register = function(newUser){
            ////console.log("REGISTER");
              //console.log(newUser);

              // if (newUser.trim()==''){
              //   return $scope.warning = "Fill in the Registration Form before registering";
              // }
              // if( (newUser.firstname === undefined || newUser.firstname == '') && (newUser.lastname === undefined || newUser.lastname == '') && (newUser.email === undefined || newUser.email == '') ) {
              //   return $scope.warning = "Fill in the Registration Form before registering";
              // }
              if(newUser.firstname === undefined || newUser.firstname == ''){
                return $scope.warning = 'User first name is empty';
              }
              else if(newUser.lastname === undefined || newUser.lastname == ''){
                return $scope.warning = 'User last name is empty';
              }
              else if(newUser.email === undefined || newUser.email == ''){
                return $scope.warning = 'User email is empty and must be a valid email address';
              }
              else if(newUser.check_password === undefined || newUser.check_password == '' || newUser.check_password != newUser.password){
                return $scope.warning = 'Passwords do not match';
              }
              else {
                var laboratory = newUser.laboratory
                if(newUser.laboratory === undefined || newUser.laboratory == ''){
                  laboratory=null;
                }
                var country=newUser.country
                if(newUser.country === undefined || newUser.country == ''){
                  country=null;
                }
                  User.register({},{'user_name': newUser.email,
                                      'user_password':newUser.password,
                                      'first_name': newUser.firstname,
                                      'last_name': newUser.lastname,
                                      'country':country,
                                      'laboratory': laboratory,
                                  }).$promise.then(function(data){
                                    if(data['status'] == 'danger'){
                                      $scope.danger=data['msg'];
                                    }
                                    else if(data['status'] == 'success'){
                                      $scope.success=data['msg'];
                                    }
                                    else if(data['status'] == 'warning'){
                                      $scope.warning=data['msg'];
                                    }

                });
              }
          };

});




app.controller('recoverCtrl',
  function($scope, User, $log, $routeParams, $location){
        
        

        $scope.recover= function(userRecover){

          if(userRecover.mail === undefined || userRecover.mail == null){
            return $scope.warning= 'User mail field is empty.'
          }
          else{
            User.recover({},{'user_name': userRecover.mail}).$promise.then(function(data){
              if(data['status'] == 'danger'){
                $scope.danger=data['msg'];
              }
              else if(data['status'] == 'success'){
                $scope.success = data['msg'];
              }
              else if(data['status'] == 'warning'){
                $scope.warning=data['msg'];
              }
            });
          }

    };
  });

app.controller('passwordRecoverCtrl', 
  function($scope, User, $log, $location, $routeParams, $timeout){

    $scope.recover = function(passwordRecover){
      if(passwordRecover.password != passwordRecover.check_password){
        return $scope.warning = 'Passwords do not match';
      }
      else{
        var params = $location.search();
        User.confirm_recover({},{'token' : params['token'], 'user_password' : passwordRecover.password}).$promise.then(function(data){
              if(data['status'] == 'danger'){
                $scope.danger=data['msg'];
              }
              else if(data['status'] == 'success'){
                $scope.success = data['msg'];
                $timeout(function(){ 
                  $location.path('/login'); 
                  },1750);
              }
              else if(data['status'] == 'warning'){
                scope.warning=data['msg'];
              }
        });
      }
    };
});

app.controller('userInfoCtrl',
    function ($scope, $rootScope, $routeParams, $location, Auth, User) {
 
        User.get({'uid': $routeParams['id']}).$promise.then(function(data){
            $scope.user = data;
            console.log($scope.user)
            $scope.joined=data['joined'].substr(0,10);

            

            });
        
        User.getLastSeen({},{'uid': $routeParams['id']}).$promise.then(function(data){
                 $scope.connected = "°" + data['connected'];
            });
        // User.getLastSeen({},{'data_joined': data['joined'] , 'data_connected' : data['connected']}).$promise.then(function(data){
        //          $scope.connected = data['connected'];
        //     });
            // var date = data['connected'];
            // var yearJoined = Number(data['joined'].substr(0,4));
            // if(Number(data['joined'].substr(0,4)) < Number(data['connected'].substr(0,4)) && Number(data['connected'].substr(0,4)) - Number(data['joined'].substr(0,4)) == 1){
            //     $scope.connected = "1 year ago";
            // }
            // else if(yearJoined  < Number(data['connected'].substr(0,4)) && Number(data['connected'].substr(0,4)) - yearJoined  != 1){
            //     $scope.connected=(Number(data['connected'].substr(0,4)) - yearJoined ).toString() + " years ago";
            // }
            // else if(Number(data['joined'].substr(5,7)) < Number(data['connected'].substr(5,7)) && Number(data['connected'].substr(5,7)) - Number(data['joined'].substr(5,7)) == 1){
            //     $scope.connected = "1 month ago";
            // }
            // else if(Number(data['joined'].substr(5,7)) < Number(data['connected'].substr(5,7)) && Number(data['connected'].substr(5,7)) - Number(data['joined'].substr(5,7)) != 1){
            //     $scope.connected=(Number(data['connected'].substr(5,7)) - Number(data['joined'].substr(5,7))).toString() + " months ago";
            // }
            // else if(Number(data['joined'].substr(8,10)) < Number(data['connected'].substr(8,10)) && Number(data['connected'].substr(8,10)) - Number(data['joined'].substr(8,10)) == 1){
            //     $scope.connected = "1 day ago";
            // }
            // else if(Number(data['joined'].substr(8,10)) < Number(data['connected'].substr(8,10)) && Number(data['connected'].substr(8,10)) - Number(data['joined'].substr(8,10)) != 1){
            //     $scope.connected=(Number(data['connected'].substr(8,10)) - Number(data['joined'].substr(8,10))).toString() + " days ago";
            // }
            // else if(Number(data['joined'].substr(11,13)) < Number(data['connected'].substr(11,13)) && Number(data['connected'].substr(11,13)) - Number(data['joined'].substr(11,13)) == 1){
            //     $scope.connected = "1 hour ago";
            // }
            // else if(Number(data['joined'].substr(11,13)) < Number(data['connected'].substr(11,13)) && Number(data['connected'].substr(11,13)) - Number(data['joined'].substr(11,13)) != 1){
            //     $scope.connected=(Number(data['connected'].substr(11,13)) - Number(data['joined'].substr(11,13))).toString() + " hours ago";
            // }
            // else if(Number(data['joined'].substr(14,16)) < Number(data['connected'].substr(14,16)) && Number(data['connected'].substr(14,16)) - Number(data['joined'].substr(14,16)) == 1){
            //     $scope.connected = "1 minute ago";
            // }
            // else if(Number(data['joined'].substr(14,16)) < Number(data['connected'].substr(14,16)) && Number(data['connected'].substr(14,16)) - Number(data['joined'].substr(14,16)) != 1){
            //     $scope.connected=(Number(data['connected'].substr(14,16)) - Number(data['joined'].substr(14,16))).toString() + " minutes ago";
            // }
            // else if(Number(data['joined'].substr(17,19)) < Number(data['connected'].substr(17,19)) && Number(data['connected'].substr(17,19)) - Number(data['joined'].substr(17,19)) == 1){
            //     $scope.connected = "1 second ago";
            // }
            // else{
            //     $scope.connected=(Number(data['connected'].substr(17,19)) - Number(data['joined'].substr(17,19))).toString() + " seconds ago";
            // }



        $scope.update = function() {
            if($scope.user != null) {
                                    //$scope?user?id
                $scope.user.$save({'uid': $routeParams['id']}).then(function(data){
                    console.log(data);
                    $scope.user = data;
                });
            }
        }
      $scope.auth_user = Auth.getUser();

});

app.controller('userprojectCtrl',
    function ($scope, $rootScope, $routeParams, $location, Auth,Dataset, User) {
        $scope.user = null;
        $scope.pfrom = 0;
        $scope.pto = 25;
        $scope.sfrom = 0;
        $scope.sto = 25;
        $scope.afrom = 0;
        $scope.ato = 25;
        $scope.sgfrom = 0;
        $scope.sgto = 25;

        User.get({'uid': $routeParams['id']}).$promise.then(function(data){
          
          $scope.user = data;

          Dataset.get({'filter':$scope.user.id,'from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'owner','all_info':'true'}).$promise.then(function(data){
            $scope.projects = data.request;
            $scope.project_number = data.project_number;
            $scope.study_number = data.study_number;
            $scope.strategy_number = data.strategy_number;
            $scope.list_number = data.list_number;
          });
        });
      $scope.auth_user = Auth.getUser();

      

      $scope.test = "";

      $scope.showStudies = function(){
        Dataset.get({'filter':$scope.user.id,'from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'owner'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
      };

      $scope.showStrategies = function(){
        Dataset.get({'filter':$scope.user.id,'from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'owner'}).$promise.then(function(data){
            $scope.strategies = data.request;
          });
      };

      $scope.showLists = function(){
        Dataset.get({'filter':$scope.user.id,'from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'owner'}).$promise.then(function(data){
            $scope.lists = data.request;
          });
      };

      $scope.more = function(type){
        if(type=="projects"){
          console.log($scope.pfrom)
          console.log($scope.pto)
          $scope.pfrom = $scope.pto + 0;
          $scope.pto = $scope.pto + 25;
          console.log($scope.pfrom)
          console.log($scope.pto)
          Dataset.get({'filter':$scope.user.id,'from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'owner'}).$promise.then(function(data){
            $scope.projects = data.request;
            console.log($scope.projects)
          });
        };
        if(type=="studies"){
          $scope.sfrom = $scope.sto + 0;
          $scope.sto = $scope.sto + 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'owner'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
        };
        if(type=="strategies"){
          $scope.afrom = $scope.ato + 0;
          $scope.ato = $scope.ato + 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'owner'}).$promise.then(function(data){
            $scope.strategies = data.request;
          });
        };
        if(type=="lists"){
          $scope.sgfrom = $scope.sgto + 0;
          $scope.sgto = $scope.sgto + 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'owner'}).$promise.then(function(data){
            $scope.lists = data.request;
          });
        };
      }
      $scope.back = function(type){

        if(type=="projects"){
          $scope.pfrom = $scope.pfrom - 25 ;
          $scope.pto = $scope.pto - 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'owner'}).$promise.then(function(data){
            $scope.projects = data.request;
          });
        };
        if(type=="studies"){
          $scope.sfrom = $scope.sfrom - 25 ;
          $scope.sto = $scope.sto - 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'owner'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
        };
        if(type=="strategies"){
          $scope.afrom = $scope.afrom - 25;
          $scope.ato = $scope.ato - 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'owner'}).$promise.then(function(data){
            $scope.strategies = data.request;
          });
        };
        if(type=="lists"){
          $scope.sgfrom = $scope.sgfrom - 25;
          $scope.sgto = $scope.sgto - 25;
          Dataset.get({'filter':$scope.user.id,'from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'owner'}).$promise.then(function(data){
            $scope.lists = data.request;
          });
        };

      }



});

app.controller('compareCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset,$cookies,$window, $cookieStore, ngDialog, $location) {
        $scope.msg = "Dashboard Tools";

        $scope.open_info = function(id){
          ngDialog.open({ template: id, className: 'ngdialog-theme-default'});
        }
        $scope.user = null
        $scope.user = Auth.getUser();

        if($window.sessionStorage.token) {
            $scope.token = $window.sessionStorage.token;
        }

        $scope.signatures = [];
        $scope.selected = ""

        if($scope.user == undefined || $scope.user == null){
          $scope.selected = $cookieStore.get('selectedID').split(',');
        }
        else{
          $scope.selected = $scope.user.selectedID.split(',');
          console.log($scope.selected);
        }
        console.log($scope.selected);
        for(var i=0;i<$scope.selected.length;i++){
          console.log($scope.selected[i]);
          console.log(i);
          Dataset.get({'filter':$scope.selected[i],'from':'None','to': 'None','collection':'signatures','field':'id'}).$promise.then(function(data){
            $scope.signatures.push(data.request);
            console.log($scope.signatures);
          });
        }


        $scope.deleted = function(signature_id){
          if($scope.user == undefined || $scope.user == null){
            $scope.selected = $cookieStore.get('selectedID').split(',');
            var index = $scope.selected.indexOf(signature_id);
            $scope.selected.splice(index, 1);
            var newcookie = $scope.selected.join(',');
            console.log(newcookie);
            $cookieStore.put('selectedID', newcookie);
          }
          else{
            $scope.selected = $scope.user.selectedID.split(',');
            console.log($scope.selected);
            var index = $scope.selected.indexOf(signature_id);
            $scope.selected.splice(index, 1);
            $scope.user.selectedID = $scope.selected.join(',');
            $scope.user.$save({'uid': $scope.user.id}).then(function(data){
                $scope.user = data;
            });
          }
        }

        

        $scope.selection = [];
        $scope.posistion = 0
        $scope.list = [{'list':1,'val':" "},{'list':2,'val':" "},{'list':3,'val':" "},{'list':4,'val':" "},{'list':5,'val':" "},{'list':6,'val':" "}]
        
        $scope.toggleSelection2 = function toggleSelection2(names,genes,id) {
          Dataset.convert({'genes':genes,'id':id,'way':'None'}).$promise.then(function(data){
            $scope.convertedList = data.converted_list;
            var name = "";
              name = id+'-'+names;

              var obj = name
              var idx = $scope.selection.indexOf(name);


              // is currently selected
              if (idx > -1) {
                $scope.selection.splice(idx, 1);
                for(var z=0;z<$scope.list.length;z++){
                  if($scope.list[z].val ==name){
                    $scope.list[z].val = " ";
                    document.getElementById('name'+$scope.list[z].list).value = "List"+$scope.list[z].list;
                    document.getElementById('area'+$scope.list[z].list).value = "";
                    break
                  }
                } 
              }

              // is newly selected
              else {
                $scope.selection.push(name);
                for(var z=0;z<$scope.list.length;z++){
                  if($scope.list[z].val ==" "){
                    $scope.list[z].val = name;
                    document.getElementById('name'+$scope.list[z].list).value = name;
                    document.getElementById('area'+$scope.list[z].list).value = $scope.convertedList.join('\n');
                    break
                  }
                } 
              }
          });
        }
});

app.controller('createCtrl',
    function ($scope, $rootScope, $routeParams, $location, Auth, User,Upload,ngDialog) {

        // var example = document.getElementById('table'),hot1;

        // hot1 = new Handsontable(example,{
        //                                     data: Handsontable.helper.createSpreadsheetData(1000, 1000),
        //                                     width: 584,
        //                                     height: 320,
        //                                     colWidths: 47,
        //                                     rowHeights: 23,
        //                                     rowHeaders: true,
        //                                     colHeaders: true
        //        });

        // var data = [
        //                 ["Project ID(s)","GUP1", "GUP2", "GUP3", "GUP4", "GUP5", "GUP6", "GUP7", "GUP8", "GUP9", "GUP10", "GUP11", "GUP12", "GUP13", "GUP14", "GUP15", "GUP16", "GUP17", "GUP18", "GUP19", "GUP20", "GUP21", "GUP22", "GUP23", "GUP24", "GUP25", "GUP26", "GUP27", "GUP28", "GUP29", "GUP30", "GUP31", "GUP32", "GUP33", "GUP34", "GUP35", "GUP36", "GUP37", "GUP38", "GUP39", "GUP40", "GUP41", "GUP42", "GUP43", "GUP44", "GUP45", "GUP46", "GUP47", "GUP48", "GUP49", "GUP50", "GUP51", "GUP52", "GUP53", "GUP54", "GUP55", "GUP56", "GUP57", "GUP58", "GUP59", "GUP60", "GUP61", "GUP62", "GUP63", "GUP64", "GUP65", "GUP66", "GUP67", "GUP68", "GUP69", "GUP70", "GUP71", "GUP72", "GUP73", "GUP74", "GUP75", "GUP76", "GUP77", "GUP78", "GUP79", "GUP80", "GUP81", "GUP82", "GUP83", "GUP84", "GUP85", "GUP86", "GUP87", "GUP88", "GUP89", "GUP90", "GUP91", "GUP92", "GUP93", "GUP94", "GUP95", "GUP96", "GUP97", "GUP98", "GUP99", "GUP100"],
        //                 ["Parent project ID(s)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Contributors (comma or semicolon separated)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Title", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Description","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Project’s controlled vocabularies (please paste the text from the ontology blabla)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Crosslink(s) (comma or semicolon separated)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["Additional Information", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //                 ["PubMedID(s)  (comma or semicolon separated)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        //             ];

        // var container = document.getElementById('table');
        // var hot = new Handsontable(container, {
        //     data: data,
        //     //data: data,
        //     // width: auto,
        //     // height: 500,
        //     renderAllRows: true,
        //     rowHeaders: true,
        //     colHeaders: true,
        //     fixedColumnsLeft: 1,
        //     //contextMenu: true,
        //     manualColumnFreeze: true
        // });
        // hot.updateSettings();






  var
    myData = Handsontable.helper.createSpreadsheetData(200, 100),
    container = document.getElementById('example1'),
    hot;
  
  hot = new Handsontable(container, {
    data: myData,
    rowHeaders: false,
    colHeaders: true,
    fixedColumnsLeft: 0,
    contextMenu: false
  });
  
 
  
  hot.updateSettings({
    fixedColumnsLeft: 3,
    rowHeaders: false
  });













































//         $scope.user = null;

//         User.get({'uid': $routeParams['id']}).$promise.then(function(data){
//             console.log("titi");
//             $scope.user = data;
//             console.log(data);
//             console.log(user);
//         });
//         console.log("toto");

//       $scope.auth_user = Auth.getUser();

//       $scope.upExcel = function (obj){
//         console.log(obj);
//         ngDialog.open({ template: 'saving', className: 'ngdialog-theme-default'})
//         console.log($routeParams['id']);
//         User.project_save({'uid': $routeParams['id'], 'file': obj}).$promise.then(function(data){
//                 console.log("here");
//                 alert(data.msg);
//                 ngDialog.close();
//         });
//       }


//       $scope.openDefault = function () {
//         ngDialog.open({
//           template: 'firstDialogId',
//           className: 'ngdialog-theme-default'
//         });
//       };
     

//       //INSERT FUNCTION UPLOAD EXCEL FILE
//       //use user id to upload en read excel file
//       $scope.signature_upload = function(excel_file) {
//             ////console.log(signature_file);
//             var resultInfo={'error':"",'critical':""};
//             Upload.upload({
//                 url: '/upload/'+$scope.user.id+'/excelupload',
//                 fields: {'uid': $scope.user.id, 'dataset': 'tmp'},
//                 file: excel_file
//             }).progress(function (evt) {
//                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                 ngDialog.open({ template: 'checking', className: 'ngdialog-theme-default'})
//                 console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//             }).success(function (data, status, headers, config) {
//                 if(data.status == '0'){
//                   console.log('file ' + config.file.name + ' uploaded.');
//                   console.log(data);
//                   resultInfo['error_p'] = data.error_project;
//                   resultInfo['error_s'] = data.error_study;
//                   resultInfo['error_a'] = data.error_assay;
//                   resultInfo['error_f'] = data.error_factor;
//                   resultInfo['error_sig'] = data.error_signature;
//                   resultInfo['critical'] = data.critical;
//                   resultInfo['file'] = data.file;
//                   ngDialog.close();
//                   ngDialog.open({ template: 'firstDialogId', scope: $scope, className: 'ngdialog-theme-default',data: resultInfo})
//                 }
//                 if (data.status == '1'){
//                   alert(data.msg);
//                 }
                
                
//             }).error(function (data, status, headers, config) {
//                 ////console.log('error status: ' + status);
//             })
//             console.log(resultInfo);    
//       };
// });
        $scope.user = null;

        User.get({'uid': $routeParams['id']}).$promise.then(function(data){
            $scope.user = data;
        });
        console.log("herer");
        console.log($scope.user);
      $scope.auth_user = Auth.getUser();

      $scope.upExcel = function (obj){
        console.log(obj);
        ngDialog.open({ template: 'saving', className: 'ngdialog-theme-default'})
        User.project_save({'uid': $routeParams['id'], 'file': obj}).$promise.then(function(data){
                alert(data.msg);
                ngDialog.close();
        });
      }


      $scope.openDefault = function () {
        ngDialog.open({
          template: 'firstDialogId',
          className: 'ngdialog-theme-default'
        });
      };
     

      //INSERT FUNCTION UPLOAD EXCEL FILE
      //use user id to upload en read excel file
      $scope.signature_upload = function(excel_file) {
            console.log("gere we are");
            var resultInfo={'error':"",'critical':""};
            Upload.upload({
                url: '/upload/'+$scope.user.id+'/excelupload',
                fields: {'uid': $scope.user.id, 'dataset': 'tmp'},
                file: excel_file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                ngDialog.open({ template: 'checking', className: 'ngdialog-theme-default'})
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                if(data.status == '0'){
                  console.log('file ' + config.file.name + ' uploaded.');
                  console.log('is' + data.error_idList);
                  console.log(data);
                  resultInfo['error_p'] = data.error_project;
                  resultInfo['error_s'] = data.error_study;
                  resultInfo['error_a'] = data.error_strategy;
                  resultInfo['error_l'] = data.error_list;
                  resultInfo['error_idList'] = data.error_idList;
                  resultInfo['critical'] = data.critical;
                  resultInfo['file'] = data.file;
                  ngDialog.close();
                  ngDialog.open({ template: 'firstDialogId', scope: $scope, className: 'ngdialog-theme-default',data: resultInfo})
                }
                if (data.status == '1'){
                  alert(data.msg);
                }
                
                
            }).error(function (data, status, headers, config) {
                ////console.log('error status: ' + status);
            })
            console.log(resultInfo);
            
      };

});


      //INSERT PREVALIDATION FILE VISUALISATION
      //show to user a preview of his project and need validation to upload
      //user modal


        
        // $scope.listOfFiles=[];
        // console.info('length is : ', $scope.listOfFiles.length, $scope.listOfFiles);
        // var user;
        // User.get({'uid': $routeParams['id']}).$promise.then(function(data){
        //      user = data;
        //     console.log(user);
        // });

        // $scope.auth_user = Auth.getUser();
        // console.log(user);

        // var uploader = $scope.uploader = new FileUploader({

        // });

        // uploader.onBeforeUploadItem = function(){
            
        //      //item.formData = [{ uid: $scope.user.id }];
        //     url:'/user/create_Excel'
        // //     //formData = [{  'file' : item }];
        // //     //$timeout(console.log('alert'),1750);
              
        //  };
        // uploader.onSuccessItem = function(fileItem){
        //     console.log("Selected file has been uploaded successfully");
        //     console.info(fileItem);
        // };
        // uploader.onAfterAddingFile = function(fileItem){

        //     console.info('onAfterAddingFile', fileItem);
        // };
        // uploader.onErrorItem = function(item,response, status, headers){
        //     console.info(status);
        //     console.info(response);
        // };

//         $scope.add = function(filesToAdd){
//             //console.info('ici' , filesToAdd.length);
//             //return console.info('la' , $scope.listOfFiles.length, $scope.listOfFiles);
//             var len = $scope.listeOfFiles;
//             console.info('la longueur de la liste est de ', len);
//             if(len == null){
//                 len=0;
//             }
//             console.log(filesToAdd);

//             if(len == 0 && filesToAdd.length == 1){
                
//                $scope.listOfFiles.push({'id' : 1 , 'file' : filesToAdd[0], 'filename' : filesToAdd[0]['name']});
//                console.info('' , i);
//             }
//             else if (len == 0 && filesToAdd.length >= 1 ){

//                 console.info('else if');
//                 for(var i = 0; i < filesToAdd.length ; i++){
//                     $scope.listOfFiles.push({'id' : len+i+1 , 'file' : filesToAdd[i], 'filename' : filesToAdd[i]['name']});
//                 }
//             }
//             else{
//                 console.info('else' , filesToAdd.length);
//                 for(var i = 0; i < filesToAdd.length ; i++){
//                     console.info('len ' , len);
//                     $scope.listOfFiles.push({'id' : len + i + 1 , 'file': filesToAdd[i], 'filename' : filesToAdd[i]['name']});
//                 }
//             };
//         };
    
// });
    

        // console.log(uploader);
        // uploader.onBeforeUploadItem = function(){
            
        //     //item.formData = [{ uid: $scope.user.id }];
        //     //url:'/user/create_Excel',
        //     //formData = [{  'file' : item }];
        //     //$timeout(console.log('alert'),1750);
              
        // };
        // // }.$promise.then(function(data){
        // //     $scope.message=data;
        // // });
        // uploader.onBeforeUploadItem = function (item) {
        //     //item.formData.push(JSON.stringify(this.data));
        //     //console.info(JSON.stringify(item));
           
        // };

        // uploader.onSuccessItem = function(fileItem){
        //     console.log("Selected file has been uploaded successfully");
        //     console.info(getType(item));
        // };
        // uploader.onAfterAddingFile = function(fileItem){

        //     console.info('onAfterAddingFile', fileItem);
        // };
        // uploader.onErrorItem = function(item, response, status, headers){
        //     console.info(status);
        //     console.info(response);
        // };

        // $scope.upExcel = function (file){
        //     User.project_save({'uid': $scope.user.id, 'file': file}).$promise.then(function(data){
        //         alert(data.msg);
        //     });

        //   console.log(file['headers']);
        //     ngDialog.open({ template: 'saving', className: 'ngdialog-theme-default'})
        //     User.project_save({'uid': $scope.user.id, 'file': obj}).$promise.then(function(data){
        //         alert(data.msg);
        //         ngDialog.close();
        // });
      





        //$scope.user = 'null'
        // User.get({'uid': $routeParams['id']}).$promise.then(function(data){
        //    var user = data;
        //    //console.log('is :', $scope.user.id)
        //  });
        // var uploader = $scope.uploader = new FileUploader();


        // uploader.onAfterAddingFile = function(fileItem) {
        //     url:'/upload/'+user['id']+'/excelupload';
        //     console.info('onAfterAddingFile', fileItem['_file']),
        //     console.info('onAfterAddingFile', uploader.isFile(fileItem['_file'])),
        //     console.info(fileItem['file']);
        // };
        // uploader.onBeforeUploadItem = function(fileItem){
        //     url:'/upload/'+user['id']+'/excelupload';
        //     uploader.success(function(data){
        //         $scope.danger=data;
        //     });
        // };
        // var uploader = $scope.uploader = new FileUploader(
        //     {
        //     url: '/var/' //set default url
        //     });
        // $scope.user = null;

        // User.get({'uid': $routeParams['id']}).$promise.then(function(data){
        //     $scope.user = data;
        // });
        // $scope.message=uploader;

        //INSERT FUNCTION UPLOAD EXCEL FILE
        //use user id to upload en read excel file
         // $scope.upload = function() {
         //    for (var i = uploader.length - 1; i >= 0; i--) {
         //        console.log(uploader[i]);
         //    };};
            ////console.log(signature_file);
      //       var resultInfo={'error':"",'critical':""};
      //       Upload.upload({
      //           url: '/upload/'+$scope.user.id+'/excelupload',
      //           fields: {'uid': $scope.user.id, 'dataset': 'tmp'},
      //           file: excel_file
      //       }).progress(function (evt) {
      //           var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //           ngDialog.open({ template: 'checking', className: 'ngdialog-theme-default'})
      //           console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
      //       }).success(function (data, status, headers, config) {
      //           if(data.status == '0'){
      //             console.log('file ' + config.file.name + ' uploaded.');
      //             console.log(data.error_assay);
      //             resultInfo['error_p'] = data.error_project;
      //             resultInfo['error_s'] = data.error_study;
      //             resultInfo['error_a'] = data.error_assay;
      //             resultInfo['error_f'] = data.error_factor;
      //             resultInfo['error_sig'] = data.error_signature;
      //             resultInfo['critical'] = data.critical;
      //             resultInfo['file'] = data.file;
      //             ngDialog.close();
      //             ngDialog.open({ template: 'firstDialogId', scope: $scope, className: 'ngdialog-theme-default',data: resultInfo})
      //           }
      //           if (data.status == '1'){
      //             alert(data.msg);
      //           }
                
                
      //       }).error(function (data, status, headers, config) {
      //           ////console.log('error status: ' + status);
      //       })
      //       console.log(resultInfo);
            
      // };


// });





//         $scope.user = null;

//         User.get({'uid': $routeParams['id']}).$promise.then(function(data){
//             $scope.user = data;
//         });

//       $scope.auth_user = Auth.getUser();

//       // $scope.upExcel = function (obj){
//       //   console.log(obj);
//       //   ngDialog.open({ template: 'saving', className: 'ngdialog-theme-default'})
//       //   User.project_save({'uid': $scope.user.id, 'file': obj}).$promise.then(function(data){
//       //           alert(data.msg);
//       //           ngDialog.close();
//       //   });
//       // }


//       $scope.openDefault = function () {
//         ngDialog.open({
//           template: 'firstDialogId',
//           className: 'ngdialog-theme-default'
//         });
//       };
     

//       //INSERT FUNCTION UPLOAD EXCEL FILE
//       //use user id to upload en read excel file
//       $scope.signature_upload = function(excel_file) {
//             ////console.log(signature_file);
//             var resultInfo={'error':"",'critical':""};
//             Upload.upload({
//                 url: '/upload/'+$scope.user.id+'/excelupload',
//                 fields: {'uid': $scope.user.id, 'dataset': 'tmp'},
//                 file: excel_file
//             }).progress(function (evt) {
//                 var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
//                 ngDialog.open({ template: 'checking', className: 'ngdialog-theme-default'})
//                 console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
//             }).success(function (data, status, headers, config) {
//                 if(data.status == '0'){
//                   console.log('file ' + config.file.name + ' uploaded.');
//                   console.log(data.error_assay);
//                   resultInfo['error_p'] = data.error_project;
//                   resultInfo['error_s'] = data.error_study;
//                   resultInfo['error_a'] = data.error_assay;
//                   resultInfo['error_f'] = data.error_factor;
//                   resultInfo['error_sig'] = data.error_signature;
//                   resultInfo['critical'] = data.critical;
//                   resultInfo['file'] = data.file;
//                   ngDialog.close();
//                   ngDialog.open({ template: 'firstDialogId', scope: $scope, className: 'ngdialog-theme-default',data: resultInfo})
//                 }
//                 if (data.status == '1'){
//                   alert(data.msg);
//                 }
                
                
//             }).error(function (data, status, headers, config) {
//                 ////console.log('error status: ' + status);
//             })
//             console.log(resultInfo);
            
//       };

//       //INSERT PREVALIDATION FILE VISUALISATION
//       //show to user a preview of his project and need validation to upload
//       //user modal


// });


app.controller('userCtrl',
  function($scope, $rootScope, $routeParams, $log, $location, $window, User, Auth, Search, SearchHits) {

    $scope.is_logged = false;
    $rootScope.$on('loginCtrl.login', function (event, user) {
      $scope.user = user;
      $scope.is_logged = true;
    });

    $scope.action = 0; // show

    $scope.show_dataset = function(dataset){
      $location.url('/browse?dataset='+dataset.id);
    };


    $scope.dataset_new = function(){
      $location.url('/dataset');
    };

    $scope.convert_timestamp_to_date = function(UNIX_timestamp){
      if(UNIX_timestamp=='' || UNIX_timestamp===null || UNIX_timestamp===undefined) { return '';}
        var a = new Date(UNIX_timestamp*1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
      };

    $scope.onSearch = function() {
      Search.search_index({'query': "status:public AND _all:"+$scope.search_sig+'*','from':0}).$promise.then(function(data){
        SearchHits.setHits(data);
        //$rootScope.search_result = data;
        $location.path('/search')
      });
    }

    $scope.email_hash = function(email) {
       var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
       return MD5(email);
    };
    /*
    User.is_authenticated().$promise.then(function(data) {
        if(data.user !== null) {
         $scope.user = data.user;
         $scope.user['is_admin'] = data.is_admin;
         $scope.is_logged = true;
         Auth.setUser($scope.user);
       }
    });
    */

    $scope.logout = function() {
        $scope.user = null;
        $scope.is_logged = false;
        Auth.setUser(null);
        delete $window.sessionStorage.token;
        $location.path('/');
    };

});

app.controller('browseCtrl',
  function($scope, $rootScope, $routeParams, $log,$cookies, $cookieStore, $location, $window, Dataset, User, Upload, Auth, ngDialog) {
      //$scope.list = [{'title': 'test1', 'items': [{'title': 'subtest1'},{'title': 'subtest2'}]}];
      $scope.user = Auth.getUser();

      if($window.sessionStorage.token) {
          $scope.token = $window.sessionStorage.token;
      }

      $scope.collaborator = null;
      $scope.location = location.host;
      $scope.urlabs = $location.absUrl();
      var nodes = new vis.DataSet();
      var edges = new vis.DataSet();
      var network;

      var options = {
        layout: {
          randomSeed: undefined,
          improvedLayout:true,
          hierarchical: {
            enabled:true,
            levelSeparation: 150,
            nodeSpacing: 100,
            treeSpacing: 200,
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: 'UD',        // UD, DU, LR, RL
            sortMethod: 'hubsize'   // hubsize, directed
          }
        }
      };
      $scope.factors = [];
      $scope.assay={}

      var container = document.getElementById('mynetwork');
      


      var params = $location.search();
      ////console.log(params);
      console.log(params);
      if(params['dataset'] !== undefined) {
        $scope.collection = "";
        if (params['dataset'].includes("GST")){
          $scope.collection = 'studies';
        };
        if (params['dataset'].includes("GPR")){
          $scope.collection = 'projects';
        };
        if (params['dataset'].includes("GSR")){
          $scope.collection = 'strategies';
        };
        if (params['dataset'].includes("GUL")){
          $scope.collection = 'lists';
        };

        Dataset.get({'filter':params['dataset'],'from':'None','to':'None','collection':$scope.collection,'field':'id'}).$promise.then(function(data){
          $scope.data = data.request;
          console.log($scope.data);

          
          if($scope.data.status != 'public' && ($scope.user == undefined || $scope.user.id != $scope.data.owner )){
            console.log($scope.data.status);
            console.log($scope.data.owner);
            console.log($scope.user);
            $scope.data = {};
            $scope.data['id'] = 'ERROR';
            $scope.data['title'] = 'You are not authorized to access this resource'
            return $scope.data
          }
          Dataset.get({'filter':$scope.data.owner,'from':'None','to':'None','collection':'users','field':'id'}).$promise.then(function(result){
              $scope.owner = result.request;
          });
         
          if($scope.collection == 'studies'){
            console.log($scope.data)
            document.getElementById('mynetwork').style.display = "none";
            //Get info on project/studies and owner
            Dataset.get({'filter':$scope.data.projects,'from':'None','to':'None','collection':'projects','field':'id'}).$promise.then(function(result){
              $scope.info_project = result.request.title;
            });
            

            $scope.data.strategies = $scope.data.strategies_id.split(',');
            $scope.data.lists = $scope.data.lists_id.split(',');
            if($scope.data.warnings != undefined){
              $scope.data.warnings = $scope.data.warnings.split(',');
            }
            if($scope.data.info != undefined){
              $scope.data.info = $scope.data.info.split(',');
            }
            if($scope.data.critical != undefined){
              $scope.data.critical = $scope.data.critical.split(',');
            }

          };

          if($scope.collection == 'strategies'){
            console.log("TRUE");
            document.getElementById('mynetwork').style.display = "none";
            console.log($scope.data);

            Dataset.get({'filter':$scope.data.projects,'from':'None','to':'None','collection':'projects','field':'id'}).$promise.then(function(result){
              $scope.info_project = result.request.title;
              console.log("here");
              console.log(result.request);
            });
            
            Dataset.get({'filter':$scope.data.studies,'from':'None','to':'None','collection':'studies','field':'id'}).$promise.then(function(result){
              $scope.info_study = result.request.title;
              console.log("here");
              console.log(result.request.title);
            });

            $scope.data.lists = $scope.data.lists_id.split(',');

            if($scope.data.warnings != undefined){
              $scope.data.warnings = $scope.data.warnings.split(',');
            }
            if($scope.data.info != undefined){
              $scope.data.info = $scope.data.info.split(',');
            }
            if($scope.data.critical != undefined){
              $scope.data.critical = $scope.data.critical.split(',');
            }
            
            // $scope.data.factors = $scope.data.factors.split(',');
            // for(var i=0;i < $scope.data.factors.length; i++){
            //   console.log($scope.data.factors[i]);
            //   var id_factor = $scope.data.factors[i];
            //   Dataset.get({'filter':id_factor,'from':'None','to':'None','collection':'factors','field':'id'}).$promise.then(function(data){
            //     $scope.factors.push(data.request);
            //   });

            // }
          };

          if($scope.collection == 'lists'){
            console.log($scope.data);

            Dataset.get({'filter':$scope.data.projects,'from':'None','to':'None','collection':'projects','field':'id'}).$promise.then(function(result){
              $scope.info_project = result.request.title;
            });
            
            Dataset.get({'filter':$scope.data.studies,'from':'None','to':'None','collection':'studies','field':'id'}).$promise.then(function(result){
              $scope.info_study = result.request.title;
            });

            if($scope.data.warnings != undefined){
              $scope.data.warnings = $scope.data.warnings.split(',');
            }
            if($scope.data.info != undefined){
              $scope.data.info = $scope.data.info.split(',');
            }
            if($scope.data.critical != undefined){
              $scope.data.critical = $scope.data.critical.split(',');
            }

            document.getElementById('mynetwork').style.display = "none";
            $scope.data.studies = $scope.data.studies.split(',');
            $scope.data.strategies = $scope.data.strategies.split(',');
            for(var z=0;z<$scope.data.strategies.length;z++){
              Dataset.get({'filter':$scope.data.strategies[z],'from':'None','to':'None','collection':'strategies','field':'id'}).$promise.then(function(data){
                $scope.strategies = data.request;
                $scope.strategies.factors = $scope.strategies.factors.split(',');
                for(var i=0;i < $scope.assays.factors.length; i++){
                  console.log($scope.assays.factors[i]);
                  var id_factor = $scope.assays.factors[i];
                  Dataset.get({'filter':id_factor,'from':'None','to':'None','collection':'factors','field':'id'}).$promise.then(function(data){
                    $scope.factors.push(data.request);
                  });

                }
              });
            }
          };

          //Network project
          if($scope.collection == 'projects'){
            //Init edge/node variable
            console.log($scope.data.studies_id);
            $scope.data_id=$scope.data.project_id
            if ($scope.data.pubmed == ""){
                $scope.data.pubmed = "-";
            }
       
            else{
                $scope.data.pubmed = $scope.data.pubmed.split(',');
            }

            if ($scope.data.contributors == ""){
                $scope.data.contributor= "-";
            }
            else{
                $scope.data.contributor = $scope.data.contributors.split(',');
            }

            
            if($scope.data.warnings != undefined){
              $scope.data.warnings = $scope.data.warnings.split(',');
            }
            if($scope.data.info != undefined){
              $scope.data.info = $scope.data.info.split(',');
            }
            if($scope.data.critical != undefined){
              $scope.data.critical = $scope.data.critical.split(',');
            }
            // return
            // var nodeId = 1
            // var nodeObj = {};
            // var nodeProject = [];
            // var edgeProject = [];
            // var selectedNode;
            // var selecteddata;

            // data.request.studies = data.request.studies.split(',')
            // data.request.lists =  data.request.lists.split(',')
            // data.request.strategies =  data.request.strategies.split(',')
            // //init root as project
            // nodeObj[data.request.id] = nodeId;
            // nodeProject.push({'id':nodeId,'label':data.request.id,'shape':'box','level':1})

            // //Create node + node index
            // for(var index in data.request.studies){
            //   nodeId ++;
            //   var obj = data.request.studies[index];
            //   nodeObj[obj] = nodeId;
            //   nodeProject.push({'id':nodeId,'label':obj,'shape':'circle','color':'#93c54b','level':2})
            // }
            // for(var index in data.request.lists){
            //   nodeId ++;
            //   var obj = data.request.lists[index];
            //   nodeObj[obj] = nodeId;
            //   nodeProject.push({'id':nodeId,'label':obj,'shape':'database','color':'#d9534f','level':4})
            // }
            // for(var index in data.request.strategies){
            //   nodeId ++;
            //   var obj = data.request.strategies[index];
            //   nodeObj[obj] = nodeId;
            //   nodeProject.push({'id':nodeId,'label':obj,'shape':'triangle','color':'grey','level':3})
            // }

            // //Create edges from root
            // for(var index in data.request.studies){
            //   var obj = data.request.studies[index];
            //   var from = 1;
            //   var to = nodeObj[obj];
            //   edgeProject.push({'from':from,'to':to})
            // }

            // //create all remining edges
            // for(var index in data.request.edges){
            //   var from = nodeObj[index];
            //   for(var asso in data.request.edges[index]){
            //     var to = nodeObj[data.request.edges[index][asso]];
            //     edgeProject.push({'from':from,'to':to})
            //   }
            //   //var from = 1;
            //   //var to = nodeObj[obj];
            //   //edgeProject.push({'from':from,'to':to})
            // }


            // // create an array with nodes
            // nodes.add(nodeProject);

            // // create an array with edges
            // edges.add(edgeProject);

            // // create a network

            // // provide the data in the vis format
            // var datanet = {
            //     nodes: nodes,
            //     edges: edges
            // };
            
            // network = new vis.Network(container, datanet, options);
            

            // // initialize your network!
            
            // network.on( 'click', function(properties) {
            //     var ids = properties.nodes;
            //     var clickedNodes = nodes.get(ids);
            //     selectedNode = clickedNodes[0]['label'];
            //     document.getElementById('information').innerHTML = selectedNode;
            //     document.getElementById('viewinfo').style.display = "inline";
            // });
          } //End network project
        });
      }
      $scope.showInfo = function(){
        var dataset = document.getElementById('information').innerHTML;
        $location.url('/browse?dataset='+dataset);
      }
      $scope.display = function(id){
        $location.url('/browse?dataset='+id);
      }


      $scope.getProject = function (id){
        Dataset.download({'uid':$scope.user.id,'id':id}).$promise.then(function(data){
          if(data['msg']){
            $scope.msg = data['msg'];
            return false
          }
          //var link = document.createElement("a");
          //console.log(data['url'])
          //link.href = data['url'];
          //link.click();
        });
      };

      $scope.addToWorkspace = function(id){
        if ($scope.user != null && $scope.user != undefined ){
            var selectedID = $scope.user.selectedID
            if (selectedID.split(',').indexOf(id) == -1){
              if (selectedID == "" || selectedID == undefined){
                selectedID = id;
                $scope.user.selectedID = selectedID;
              }
              else {
                selectedID = selectedID+','+id;
                $scope.user.selectedID = selectedID;
              }
      
            }
            
            $scope.user.$save({'uid': $scope.user.id}).then(function(data){
                    $scope.user = data;
                    console.log(data);
            });
        }
        else {
          $cookieStore.put('selectedID', id);
        }
      }

      $scope.file_upload = function(file,type) {
            console.log(file);
            Upload.upload({
                url: '/upload/'+$scope.user.id+'/'+$scope.data.id+'/file_upload',
                fields: {'uid': $scope.user.id, 'dataset': $scope.data.projects,'type':type, 'name':file.name, 'sid':$scope.data.id},
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
                console.log('file ' + config.file.name + ' uploaded.');
                alert(data.msg);


            }).error(function (data, status, headers, config) {
                console.log('error status: ' + status);
                alert(data.msg)
            })
            
      };

      $scope.signature_upload = function(excel_file,pid) {
            ////console.log(signature_file);
            var resultInfo={'error':"",'critical':""};
            Upload.upload({
                url: '/upload/'+$scope.user.id+'/excelupload',
                fields: {'uid': $scope.user.id, 'dataset': 'tmp'},
                file: excel_file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                //document.getElementById("bgimg").style.display = "block";
                console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                ngDialog.open({ template: 'checking', className: 'ngdialog-theme-default'})
            }).success(function (data, status, headers, config) {
                if (data.status == "0"){
                  console.log('file ' + config.file.name + ' uploaded.');
                  console.log(data.error_assay);
                  resultInfo['error_p'] = data.error_project;
                  resultInfo['error_s'] = data.error_study;
                  resultInfo['error_a'] = data.error_assay;
                  resultInfo['error_f'] = data.error_factor;
                  resultInfo['error_sig'] = data.error_signature;
                  resultInfo['critical'] = data.critical;
                  resultInfo['file'] = data.file;
                  resultInfo['pid'] = pid;
                  ngDialog.close();
                  ngDialog.open({ template: 'firstDialogId', scope: $scope, className: 'ngdialog-theme-default',data: resultInfo})
                }
                if (data.status == '1'){
                  alert(data.msg);
                }
                //document.getElementById("bgimg").style.display = "none";
            }).error(function (data, status, headers, config) {
                ////console.log('error status: ' + status);
            })
            console.log(resultInfo);
            
      };
      $scope.upExcel = function (obj,pid){
        console.log(obj);
        ngDialog.open({ template: 'saving', className: 'ngdialog-theme-default'})
        User.update({'uid': $scope.user.id, 'file': obj, 'pid' : pid}).$promise.then(function(data){
                alert(data.msg);
                ngDialog.close();
        });
      }

      $scope.convert_timestamp_to_date = function(UNIX_timestamp){
          if(UNIX_timestamp=='' || UNIX_timestamp===null || UNIX_timestamp===undefined) { return '';}
          var a = new Date(UNIX_timestamp*1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        }

      $scope.switch = function(project){
        var r = confirm("You are about to make your project public.");
        if (r == true) {
            Dataset.pending({'project':project}).$promise.then(function(data){
              alert(data.msg);
            });
        }
      }

      

      $scope.can_edit = function() {
          if ($scope.user === null){
            return false;
          };
          if($scope.dataset !== undefined && $scope.user !== undefined) {
            if($scope.dataset.status != "private") {
                return false;
            }
            if($scope.dataset.owner == $scope.user.id) {
                return true;
            }
            if($scope.dataset.collaborators.indexOf($scope.user.id)>=0) {
                return true;
            }
            if($scope.user['admin'] !== undefined && $scope.user['admin']) {
                return true;
            }
          }
          else {
              return false;
          }
      }
});

app.controller('databaseCtrl',
  function($scope, $rootScope, $routeParams, $log, $location, $window, User, Dataset, Auth, ngDialog, $filter, ngTableParams) {
      //$scope.list = [{'title': 'test1', 'items': [{'title': 'subtest1'},{'title': 'subtest2'}]}];
      $scope.user = Auth.getUser();
      if($window.sessionStorage.token) {
          $scope.token = $window.sessionStorage.token;
      }
      $scope.collaborator = null;
      $scope.location = location.host;
      $scope.pfrom = 0;
      $scope.pto = 25;
      $scope.sfrom = 0;
      $scope.sto = 25;
      $scope.afrom = 0;
      $scope.ato = 25;
      $scope.sgfrom = 0;
      $scope.sgto = 25;

      Dataset.get({'filter':'private','from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'status','all_info':'true'}).$promise.then(function(data){
        $scope.projects = data.request;
        //console.log('start');
        //
        //console.log($scope.projects[0].lists_id);
        //console.log('stop');
        $scope.projects_number = data.project_number;
        $scope.studies_number = data.study_number;
        $scope.strategies_number = data.strategy_number;
        $scope.lists_number = data.list_number;
      });



      $scope.showStudies = function(){
        Dataset.get({'filter':'private','from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'status'}).$promise.then(function(data){
            $scope.studies = data.request;
            
          });
      };

      $scope.showStrategies = function(){
        Dataset.get({'filter':'private','from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'status'}).$promise.then(function(data){
            $scope.strategies = data.request;
          });
      };

      $scope.showLists = function(){
        Dataset.get({'filter':'private','from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'status'}).$promise.then(function(data){
            $scope.lists = data.request;
            console.log($scope.lists);
          });
      };

      $scope.more = function(type){

        if(type=="projects"){
          console.log($scope.pfrom)
          console.log($scope.pto)
          $scope.pfrom = $scope.pto + 0;
          $scope.pto = $scope.pto + 25;
          console.log($scope.pfrom)
          console.log($scope.pto)
          Dataset.get({'filter':'private','from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'status'}).$promise.then(function(data){
            $scope.projects = data.request;
          });
        }
        else if(type=="studies"){
          $scope.sfrom = $scope.sto + 0;
          $scope.sto = $scope.sto + 25;
          Dataset.get({'filter':'private','from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'status'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
        }
        else if(type=="strategies"){
          $scope.afrom = $scope.ato + 0;
          $scope.ato = $scope.ato + 25;
          Dataset.get({'filter':'privateate','from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'status'}).$promise.then(function(data){
            $scope.strategies = data.request;
          });
        }
        else if(type=="lists"){
        console.log("here")
          $scope.sgfrom = $scope.sgto + 0;
          $scope.sgto = $scope.sgto + 25;
          Dataset.get({'filter':'private','from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'status'}).$promise.then(function(data){
            $scope.lists = data.request;
            console.log(data);
          });
        }
        else{
            $scope.msg="Error - Please contact the administrator";
        }
      };

      $scope.back = function(type){

        if(type=="projects"){
          $scope.pfrom = $scope.pfrom - 25 ;
          $scope.pto = $scope.pto - 25;
          Dataset.get({'filter':'private','from':$scope.pfrom,'to': $scope.pto,'collection':'projects','field':'status'}).$promise.then(function(data){
            $scope.projects = data.request;
          });
        }
        else if(type=="studies"){
          $scope.sfrom = $scope.sfrom - 25 ;
          $scope.sto = $scope.sto - 25;
          Dataset.get({'filter':'private','from':$scope.sfrom,'to': $scope.sto,'collection':'studies','field':'status'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
        }
        else if(type=="strategies"){
          $scope.afrom = $scope.afrom - 25;
          $scope.ato = $scope.ato - 25;
          Dataset.get({'filter':'private','from':$scope.afrom,'to': $scope.ato,'collection':'strategies','field':'status'}).$promise.then(function(data){
            $scope.studies = data.request;
          });
        }
        else if(type=="lists"){
          $scope.sgfrom = $scope.sgfrom - 25;
          $scope.sgto = $scope.sgto - 25;
          Dataset.get({'filter':'private','from':$scope.sgfrom,'to': $scope.sgto,'collection':'lists','field':'status'}).$promise.then(function(data){
            $scope.lists = data.request;
          });
        }
        else{
            $scope.msg="Error - Please cotnact the administrator";
        }

      };


      $scope.convert_timestamp_to_date = function(UNIX_timestamp){
          if(UNIX_timestamp=='' || UNIX_timestamp===null || UNIX_timestamp===undefined) { return '';}
          var a = new Date(UNIX_timestamp*1000);
          var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          var year = a.getFullYear();
          var month = months[a.getMonth()];
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = date + ',' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
          return time;
        };

      $scope.open_info = function(id){
        ngDialog.open({ template: id, className: 'ngdialog-theme-default'});
      };    

});

app.controller('ontologiesCtrl',
    function ($scope,$rootScope, $log, Auth, User, Dataset, $location) {
      $scope.msg = "Dashboard Tools";
      $scope.selected_organism = 'none';
      console.log($scope.selected_organism);

      $scope.get_onto = function(val,database) {
        ////console.log(database);
        return Dataset.ontologies({},{'database':database,'search':
          val}).$promise.then(function(data){
            return data.map(function(item){
                 return item;
           });
         });
       };

      $scope.selected_tissue = function(item, model,label){
         $scope.selected_tissue = item;
         document.getElementById('selected_tissue').style.display = "block";

      };

      $scope.selected_organism = function(item, model,label){
         $scope.selected_organism = item;
         document.getElementById('organism_results').style.display = "block";
      };

      $scope.selected_pathologies = function(item, model,label){
         $scope.selected_pathologies = item;
         document.getElementById('selected_pathologies').style.display = "block";
      };

      $scope.selected_molecule = function(item, model,label){
         $scope.selected_molecule = item;
         document.getElementById('selected_molecule').style.display = "block";
      };

      $scope.selected_technology= function(item, model,label){
         $scope.selected_technology = item;
         document.getElementById('selected_technology').style.display = "block";
      };

});

app.controller('adminCtrl',
  function ($scope, $rootScope, $routeParams, $log, $location, $filter, $window, User, Auth, Admin, Dataset, ngTableParams) {
      $scope.msg = null;
      var user = Auth.getUser();
      if (user === null || user === undefined || ! user.admin) {
          $location.path('');
      }
      $scope.project_number = 0;
      $scope.study_number = 0;
      $scope.assay_number = 0;
      $scope.signature_number = 0;
      $scope.users = null;
      $scope.pendings = null;
      Admin.dbinfo().$promise.then(function(data){
        $scope.project_number = data['project_number'];
        $scope.study_number = data['study_number'];
        $scope.strategy_number = data['strategy_number'];
        $scope.list_number = data['list_number'];
        $scope.users = data.users;
        $scope.pendings = data.pendings;
      });

      $scope.validate = function(project) {
        Admin.validate({'project':project}).$promise.then(function(data){
          $scope.msg=data.msg;
        });
      }

      $scope.Rdata = function(project) {
        Admin.validate({'project':""}).$promise.then(function(data){
          $scope.msg=data.msg;
        });
      }

       $scope.annofile = function(project) {
        Admin.validate({'project':"gohomo"}).$promise.then(function(data){
          $scope.msg=data.msg;
        });
      }

      $scope.unvalidation = function(project) {
        Admin.unvalidate({'project':project}).$promise.then(function(data){
          $scope.msg=data.msg;
        });
      }

});




app.service('Auth', function() {
    var user =null;
    return {
        getUser: function() {
            return user;
        },
        setUser: function(newUser) {
            user = newUser;
        },
        isConnected: function() {
            return !!user;
        }
    };
});

app.service('SearchHits', function() {
    var hits =null;
    return {
        getHits: function() {
            return hits;
        },
        setHits: function(results) {
            hits = results;
        }
    };
});

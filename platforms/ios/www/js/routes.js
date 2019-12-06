angular.module('app.routes', [])
.run(function($state, $rootScope) {
  $rootScope.$on('$stateChangeSuccess', function (evt, toState) {


    if (toState.headerChangeColor) {
      $rootScope.headerChangeColor = toState.headerChangeColor;
    } else {
      $rootScope.headerChangeColor = 'bar-royal bh';
    }


  });
})
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('menu', {
        url: '/menu',
        templateUrl: 'templates/menu.html',
//        cache: false,
        abstract: true,
        controller: 'menuCtrl',
        controllerAs: 'menuCtrl'
      })

      .state('menu.projectList', {
        url: '/allProjectList',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/projectIist.html',
            controller: 'projectListCtrl',

          }
        },
        headerChangeColor: 'project-list'
      })



      .state('menu.home', {
        url: '/page1',
        views: {
          'side-menu21': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })

      .state('menu.project', {
        url: '/project?projectId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/project.html',
            controller: 'projectCtrl',
            resolve: {
              projectInfo: function ($stateParams, ProjectService) {
                return ProjectService.getProjectById($stateParams.projectId);
              }
            }
          }
        },
        headerChangeColor: 'project-list'
      })


      .state('changePassword', {
        url: '/changePassword?emailId',
        templateUrl: 'templates/changePassword.html',
        controller: 'changePasswordCtrl',
        headerChangeColor: 'bar-yello'
      })

      .state('menu.changeExitingPassword', {
              url: '/changeExitingPassword',
              cache:false,
              views: {
                'side-menu21': {
                  templateUrl: 'templates/change-existing-password.html',
                  controller: 'changeExistingPasswordCtrl'
                }
              },
              headerChangeColor: 'bar-yello'
            })

      .state('menu.projectRecord', {
        url: '/projectRecord?projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/projectRecord.html',
            controller: 'projectRecordCtrl',
            resolve: {
              projectInfo: function ($stateParams, ProjectService) {
                return ProjectService.getProjectById($stateParams.projectId);
              }
            }
          }
        },
        headerChangeColor: 'project-list'
      })

      .state('menu.companyInfo', {
        url: '/company-info?firmName',

        views: {
          'side-menu21': {
            templateUrl: 'templates/company-info.html',
            controller: 'companyInfoCtrl'

          }
        }
      })

      .state('menu.occupantsType', {
        url: '/occupantsType',
        cache:false,
        views: {
          'side-menu21': {
            parent : 'menu.projectRecord',
            templateUrl: 'templates/occupantsType.html',
            controller: 'occupantsTypeCtrl'
          }
        }
      })

      .state('menu.contractType', {
        url: '/contractType',
        cache: false,
        views: {
          'side-menu21': {
            parent : 'menu.projectRecord',
            templateUrl: 'templates/contractType.html',
            controller: 'contractTypeCtrl'
          }
        }
      })

      .state('menu.addressType', {
        url: '/addressType',
        cache:false,
        views: {
          'side-menu21': {
            parent : 'menu.projectRecord',
            templateUrl: 'templates/addressType.html',
            controller: 'addressTypeCtrl'
          }
        }
      })

      .state('menu.equipment', {
        url: '/equipment?memberId&projectId',
        cache:false,
        views: {
          'side-menu21': {
            parent : 'menu.projectRecord',
            templateUrl: 'templates/equipment.html',
            controller: 'equipmentCtrl',
            resolve: {
              equipments: function ($stateParams, EquipmentService) {
                return EquipmentService.getAllEquipmentOfProject($stateParams.memberId,$stateParams.projectId);
              }
            }
          }
        },
        headerChangeColor: 'project-list'
      })

      .state('menu.teamRecord', {
        url: '/teamRecord?memberId&projectId&from',
        views: {
          'side-menu21': {
            templateUrl: 'templates/teamRecord.html',
            controller: 'teamRecordCtrl',
            resolve: {
              memberInfo: function ($stateParams, TeamMemberService) {
                return TeamMemberService.getMemberById($stateParams.memberId,$stateParams.projectId);
              }
            }
          }
        },
        headerChangeColor: 'project-list'
      })

      .state('menu.memberType', {
        url: '/memberType',
        views: {
          'side-menu21': {
            templateUrl: 'templates/memberType.html',
            controller: 'memberTypeCtrl'
          }
        }
      })

      .state('menu.viewAllTeamMembers', {
        url: '/viewAllTeamMembers?projectId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/teamMembers.html',
            controller: 'teamMembersCtrl',
            resolve: {
              allTeamMemberInfo: function ($stateParams, TeamMemberService) {
                return TeamMemberService.getAllTeamMembers($stateParams.projectId);
              }
            }
          }
        },
        headerChangeColor: 'team-member-screen'
      })

      .state('menu.companyMembers', {
        url: '/companyMembers',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/companyMembers.html',
            controller: 'companyMembersCtrl'
          }
        },
        headerChangeColor: 'company-members'
      })

      .state('login', {
        url: '/login',
        cache: false,
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
      })

      .state('menu.NCW-home', {
        url: '/login',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/NCW-home.html',
            controller: 'ncwHomeCtrl'
        }
      }})

      .state('menu.NCW-area', {
        url: '/NCW-area?memberId&projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/NCW-area.html',
            controller: 'ncwAreaCtrl'
          }
        }
      })



      .state('menu.help', {
        url: '/help',
        views: {
          'side-menu21': {
            templateUrl: 'templates/help.html',
            controller: 'helpCtrl'
          }
        },
        headerChangeColor: 'bar-help-screen'
      })

      .state('menu.helpDefModel', {
        url: '/help-def-model',
        views: {
          'side-menu21': {
            templateUrl: 'templates/help-def-model.html',
            controller: 'helpDefModelController'
          }
        }
      })

      .state('menu.defaultAreaModel', {
        url: '/default-area-model',
        views: {
          'side-menu21': {
            templateUrl: 'templates/default-area-model.html',
            controller: 'defaultAreaModelController'
          }
        }
      })

      .state('menu.MemberTypeModel', {
        url: '/member-type-model',
        views: {
          'side-menu21': {
            templateUrl: 'templates/member-type-model.html',
            controller: 'MemberTypeModelController'
          }
        }
      })

      .state('menu.DeliveryTypeModel', {
        url: '/delivery-type-model',
        views: {
          'side-menu21': {
            templateUrl: 'templates/delivery-type-model.html',
            controller: 'DeliveryTypeModelController'
          }
        }
      })

      .state('menu.map', {
        url: '/map?destination&zipCode&city&state&projectName',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/map.html',
            controller: 'mapCtrl'
          }
        },
        headerChangeColor: 'project-list'
      })

      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl',
        headerChangeColor: 'bar-yello'
      })


      .state('menu.selectArea', {
        url: '/select-area?projectId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/selectArea.html',
            controller: 'selectAreaCtrl',
            resolve: {
              projectAreas: function ($stateParams, AreaService) {
                return AreaService.getAllAreaByProject($stateParams.projectId);
              }
            }
          }
        }
       // headerChangeColor: 'bar-violate'
      })

      .state('menu.addArea', {
        url: '/add-area?projectId',
        cache:false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/addArea.html',
            controller: 'addAreaCtrl',
            resolve: {
              areas: function ($stateParams, AreaService) {
                return AreaService.getAllAreaByProject($stateParams.projectId);
              }
            }
          }
        }
        //headerChangeColor: 'bar-violate'
      })

      .state('menu.assignments', {
        url: '/assignments?projectId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/assignments.html',
            controller: 'assignmentsCtrl',
            resolve: {
              assignmentsData: function ($stateParams, AssignmentService) {
                return AssignmentService.getAssignmentsByProjectId($stateParams.projectId);
              }
            }
          }
        }
        //headerChangeColor: 'bar-violate'
      })

      .state('menu.skillCertification', {
        url: '/skill-certification?projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/skillCertification.html',
            controller: 'skillCertificationCtrl',
            resolve: {
              skillsData: function ($stateParams, SkillCertificationService) {
                return SkillCertificationService.getSkillsByProjectId($stateParams.projectId);
              }
            }
          }
        }
      })

       .state('menu.courseWork', {
        url: '/courseWork',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/courseWork.html',
            controller: 'courseWorkCtrl',
            resolve: {
              skillsData: function (SkillCertificationService) {
                return SkillCertificationService.getSkillsByCompanyId();
              }
            }
          }
        },
        headerChangeColor: 'course-work'
      })

      .state('menu.approval', {
        url: '/approval?skillId&projectId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/approval.html',
            controller: 'approvalCtrl',
            resolve: {
              skillDetail: function ($stateParams, SkillCertificationService) {
                return SkillCertificationService.getSkillsById($stateParams.skillId);
              }
            }
          }
        }
      })

      .state('menu.defination', {
        url: '/occupantType/defination',
        views: {
          'side-menu21': {
            templateUrl: 'templates/defination.html',
            controller: 'definationCtrl'
          }
        }
      })

      .state('menu.memberEmail', {
        url: '/teamRecord/memberEmail',
        views: {
          'side-menu21': {
            templateUrl: 'templates/memberEmail.html',
            controller: 'memberEmailCtrl'
          }
        },
        headerChangeColor: 'email-screen'
      })


      .state('menu.signature', {
        url: '/signature?skillId&projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/signature.html',
            controller: 'signatureCtrl'
          }
        }
      })

      .state('menu.eqpsignature', {
        url: '/eqpsignature?memberId&projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/eqpsignature.html',
            controller: 'eqpsignatureCtrl'
          }
        }
      })


      .state('menu.acknowledgement', {
        url: '/acknowledgement?memberId&projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/acknowledgement.html',
            controller: 'acknowledgementCtrl'
          }
        }
      })


      .state('menu.trainingVideos', {
        url: '/trainingVideos',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/trainingVideos.html',
            controller: 'trainingVideosCtrl'
          }
        },
        headerChangeColor: 'training-videos'
      })

      .state('menu.captiveGame', {
        url: '/captiveGame',
        views: {
          'side-menu21': {
            templateUrl: 'templates/captiveGame.html',
            controller: 'captiveGameCtrl'
          }
        },
        headerChangeColor: 'captive-game'
      })

      .state('menu.courseGame', {
        url: '/course-game?skillName&skillId',
        cache: false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/course-game.html',
            controller: 'courseGameCtrl',
            resolve: {
              userSkillProgressInfo: function ($stateParams, SkillCertificationService) {
                return SkillCertificationService.getUserSkillCertificationProgress($stateParams.skillId);
              }
            }
          }
        }
      })

      .state('menu.ncwProjectList', {

                cache: false,
                views: {
                    'side-menu21': {
                      templateUrl: 'templates/ncw-project-list.html',
                      controller: 'ncwProjectListCtrl'
                    }
                  }

              })

      .state('menu.addExistingMember', {
        url: '/addExistingMember?projectId',
        cache:false,
        views: {
          'side-menu21': {
            templateUrl: 'templates/add-existing-member.html',
            controller: 'addExistingMemberCtrl',
            resolve: {
              membersInfo: function ($stateParams, TeamMemberService) {
                return TeamMemberService.getAllCompanyMemberNotInProject($stateParams.projectId);
              }
            }
          }
        }
      })

     .state('menu.AreaAssignment', {
        url: '/area-assignment?projectId',
        views: {
          'side-menu21': {
            templateUrl: 'templates/AreaAssignment/areaList.html',
            controller: 'areaAssignmentCtrl',
            resolve: {
              projectAreas: function ($stateParams, AreaService) {
                return AreaService.getAllAreaByProject($stateParams.projectId);
              }
            }

          }
        },
       // headerChangeColor: 'captive-game'
      })





    $urlRouterProvider.otherwise('/login')


  });

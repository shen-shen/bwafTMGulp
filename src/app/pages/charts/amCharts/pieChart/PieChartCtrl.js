/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BwafTM.pages.charts.amCharts')
  .controller('PieChartCtrl', PieChartCtrl1);

  /** @ngInject */
  function PieChartCtrl1($element, $location, $scope, ReportService, ResultService,layoutPaths, baConfig) {
    ReportService.then(function(response){ 
    var reportData = response.pieChartData;
    var layoutColors = baConfig.colors;
    var id = $element[0].getAttribute('id');
    var pieChart = AmCharts.makeChart(id, {
      type: 'pie',
      startDuration: 0,
      theme: 'blur',
      addClassNames: true,
      color: layoutColors.defaultText,
      labelTickColor: layoutColors.borderDark,
      legend: {
        position: 'right',
        marginRight: 100,
        autoMargins: true,
        color: '#000000',
        clickMarker: handleLegendClick,
        clickLabel: handleLegendClick
      },
      innerRadius: '40%',
      defs: {
        filter: [
          {
            id: 'shadow',
            width: '200%',
            height: '200%',
            feOffset: {
              result: 'offOut',
              in: 'SourceAlpha',
              dx: 0,
              dy: 0
            },
            feGaussianBlur: {
              result: 'blurOut',
              in: 'offOut',
              stdDeviation: 5
            },
            feBlend: {
              in: 'SourceGraphic',
              in2: 'blurOut',
              mode: 'normal'
            }
          }
        ]
      },
      dataProvider: reportData,
      valueField: 'count',
      titleField: 'name',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-left',

      autoMargins: true,
      marginTop: 0,
      alpha: 0.8,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      pullOutRadius: 0,
      pathToImages: layoutPaths.images.amChart,
      responsive: {
        enabled: true,
        rules: [
          // at 900px wide, we hide legend
          {
            maxWidth: 900,
            overrides: {
              legend: {
                enabled: true
              }
            }
          },

          // at 200 px we hide value axis labels altogether
          {
            maxWidth: 200,
            overrides: {
              valueAxes: {
                labelsEnabled: true
              },
              marginTop: 30,
              marginBottom: 30,
              marginLeft: 30,
              marginRight: 30
            }
          }
        ]
      }
    });


    pieChart.addListener('init', handleInit);

    pieChart.addListener('rollOverSlice', function (e) {
      handleRollOver(e);
    });

    function handleInit() {
      pieChart.legend.addListener('rollOverItem', handleRollOver);
    }

    function handleRollOver(e) {
      var wedge = e.dataItem.wedge.node;
      wedge.parentNode.appendChild(wedge);
    }

    pieChart.addListener('clickSlice', handleSliceLink);

    // pieChart.addListener('clickL', handleSliceLink);

    function handleSliceLink(e) {
      var selectedData = e.dataItem.dataContext;
      var query = 
      {
        buildName: response.buildName,
        name: selectedData.name
      };

      //post to backend interface
      $scope.$apply(function(){

        // console.log(query);
        $location.path('/tables/smart');
      });
      
      // TODO: Pass in data to show table
      //service.then()
      // ResultService.then(function(response){

      // });
    }

    function handleLegendClick(graph) {
      $scope.$apply(function(){
        $location.path('/tables/smart');
      });
    }

    });
  }

})();
  // angular.module('BwafTM.pages.charts.amCharts').
  //     factory('ReportService', ['$http', '$q', 'RouteQuery', function($http, $q, routeQuery) {
  //         return routeQuery.get('http://localhost:1337/BuildCount');
  //     }]);
//   /** @ngInject */
//   function PieChartCtrl($element, layoutPaths, baConfig) {
//     var layoutColors = baConfig.colors;
//     var id = $element[0].getAttribute('id');
//     var pieChart = AmCharts.makeChart(id, {
//       type: 'pie',
//       startDuration: 0,
//       theme: 'blur',
//       addClassNames: true,
//       color: layoutColors.defaultText,
//       labelTickColor: layoutColors.borderDark,
//       legend: {
//         position: 'right',
//         marginRight: 100,
//         autoMargins: false,
//       },
//       innerRadius: '40%',
//       defs: {
//         filter: [
//           {
//             id: 'shadow',
//             width: '200%',
//             height: '200%',
//             feOffset: {
//               result: 'offOut',
//               in: 'SourceAlpha',
//               dx: 0,
//               dy: 0
//             },
//             feGaussianBlur: {
//               result: 'blurOut',
//               in: 'offOut',
//               stdDeviation: 5
//             },
//             feBlend: {
//               in: 'SourceGraphic',
//               in2: 'blurOut',
//               mode: 'normal'
//             }
//           }
//         ]
//       },
//       dataProvider: [
//         {
//           country: 'Lithuania',
//           litres: 501.9
//         },
//         {
//           country: 'Czech Republic',
//           litres: 301.9
//         },
//         {
//           country: 'Ireland',
//           litres: 201.1
//         },
//         {
//           country: 'Germany',
//           litres: 165.8
//         },
//         {
//           country: 'Australia',
//           litres: 139.9
//         },
//         {
//           country: 'Austria',
//           litres: 128.3
//         },
//         {
//           country: 'UK',
//           litres: 99
//         },
//         {
//           country: 'Belgium',
//           litres: 60
//         }
//       ],
//       valueField: 'litres',
//       titleField: 'country',
//       export: {
//         enabled: true
//       },
//       creditsPosition: 'bottom-left',

//       autoMargins: false,
//       marginTop: 10,
//       alpha: 0.8,
//       marginBottom: 0,
//       marginLeft: 0,
//       marginRight: 0,
//       pullOutRadius: 0,
//       pathToImages: layoutPaths.images.amChart,
//       responsive: {
//         enabled: true,
//         rules: [
//           // at 900px wide, we hide legend
//           {
//             maxWidth: 900,
//             overrides: {
//               legend: {
//                 enabled: false
//               }
//             }
//           },

//           // at 200 px we hide value axis labels altogether
//           {
//             maxWidth: 200,
//             overrides: {
//               valueAxes: {
//                 labelsEnabled: false
//               },
//               marginTop: 30,
//               marginBottom: 30,
//               marginLeft: 30,
//               marginRight: 30
//             }
//           }
//         ]
//       }
//     });

//     pieChart.addListener('init', handleInit);

//     pieChart.addListener('rollOverSlice', function (e) {
//       handleRollOver(e);
//     });

//     function handleInit() {
//       pieChart.legend.addListener('rollOverItem', handleRollOver);
//     }

//     function handleRollOver(e) {
//       var wedge = e.dataItem.wedge.node;
//       wedge.parentNode.appendChild(wedge);
//     }
//   }

// })();

'use strict';

angular.module('trytonCrmApp')
  .directive('typeAhead', function ($compile, $timeout) {
    return {
      restrict: 'A',
      scope: {
        model: '=ngModel',
        getOptions: '=getOptions',  // Callback to fetch results
        config: '=config',
        onSelect: '=onSelect',
      },
      link: function (scope, elm, attr) {

        // Configuration
        var config = angular.extend({
          delay: 400,
          displayName: 'name'
        }, scope.config || {});

        // View manipulation
        elm.addClass('ng-hide');
        var displayElm = angular.element(
          '<input ng-model="displayValue" placeholder="' + attr.placeholder + '" type="text" />');
        elm.after(displayElm);
        $compile(displayElm)(scope);

        var resultElm = angular.element(
          '<div class="ui fluid dropdown" ng-class="{active: show, visible: show}">' +
            '<div class="ui menu">' +
              '<div class="item" ng-click="select($index)" ng-repeat="option in options">' +
                '{{ getDisplayName(option) }}</div>' +
              '<div class="item" ng-hide="options.length"> Create New Record <b>"{{ displayValue }}"</b></div>' +
            '</div>' +
          '</div>');
        displayElm.after(resultElm);
        $compile(resultElm)(scope);

        // Hide dropdown list on blur
        displayElm.bind('blur', function () {
          $timeout(function () {
            scope.show = false;
            scope.$apply();
          }, 100);
        });

        // Fetch result on typing
        var searchTimeout;
        displayElm.bind('keyup', function () {
          if (searchTimeout) {
            $timeout.cancel(searchTimeout);
          }

          searchTimeout = $timeout(function() {
            // Callback to fetch results
            scope.getOptions(scope.displayValue)
              .success(function (result) {
                scope.options = result;
                scope.show = true;
              });
          }, config.delay);
        });

        scope.getDisplayName = function (record) {
          // Return display name of a record
          return record[config.displayName];
        };

        scope.select = function (value) {
          scope.model = scope.options[value];
          scope.displayValue = scope.getDisplayName(scope.options[value]);
          if (angular.isFunction(scope.onSelect)) {
            scope.onSelect(scope.options[value]);
          }
        };
      }
    };
  })
  .directive('dropdown', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        ngModel: '=?',
        options: '=?'
      },
      link: function (scope, elm, attr) {
        scope.displayName = function (option) {
          return option[attr.displayAttr];
        };
        scope.selectOption = function (option) {
          scope.ngModel = option;
          return true;
        };

        // Render View
        elm.html(
          '<div class="text">Select</div>' +
          '<i class="dropdown icon"></i>'
        );
        var optionsHtml = angular.element(
          '<div class="menu">' +
            '<div class="item" ' +
              'ng-click="selectOption(option)" ng-repeat="option in options">' +
              '{{ displayName(option) }}' +
            '</div>' +
          '</div>'
        );
        elm.append(optionsHtml);
        $compile(optionsHtml)(scope);
        scope.$watch(function() {return scope.options;}, function () {
          $(elm).dropdown();
        });
      }
    };
  });

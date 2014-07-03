'use strict';

angular.module('ngSemantic', [])
  .directive('modal', function () {
    return {
      restrict: 'E',
      scope: true,
      link: function (scope, element, attr) {
        scope.modalElm = $(element).find('.ui.modal');
        scope.modalElm.modal('setting', {
          'transition': attr.transition || 'scale',
          'duration': attr.duration || 400,
          'closable': attr.closable || true,
        });

        scope.openModal = function () {
          scope.modalElm.modal('show');
        };

        scope.closeModal = function () {
          scope.modalElm.modal('hide');
        };
      }
    };
  });

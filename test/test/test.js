'use strict';

/* global
      expect, it, describe, beforeEach, afterEach, inject, spyOn, chatFriends,
      EventSourceInstance, mockChatPresence, mockChatMessage, mockUserPresence
    :false
*/

describe('Angular Semantic', function() {

  beforeEach(function(){
    angular.mock.module('ngSemantic');
  });

  describe('Directive: modal', function () {

    var $scope;

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
    }));

    it('should call modal', inject(function ($compile) {
      var element = angular.element('<modal>' +
        '<a class="ui purple button">' +
          'Open Button' +
        '</a>' +
        '<div class="ui modal">' +
          '<i class="close icon"></i>' +
        '</div>' +
      '</modal>')
      $compile(element)($scope);
      var scope = element.scope();
      spyOn(scope.modalElm, 'modal').andCallThrough();

      scope.openModal();
      expect(scope.modalElm.modal.callCount).toBe(1);
      expect(scope.modalElm.modal.mostRecentCall.args[0]).toBe('show');

      scope.closeModal();
      expect(scope.modalElm.modal.callCount).toBe(2);
      expect(scope.modalElm.modal.mostRecentCall.args[0]).toBe('hide');
    }));
  });
});
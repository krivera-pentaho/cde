/*!
 * Copyright 2002 - 2015 Webdetails, a Pentaho company. All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define(['cdf/Dashboard.Clean', 'cde/components/NewMapComponent', 'cdf/lib/jquery'],
  function(Dashboard, NewMapComponent, $) {

  /**
   * ## The New Map Component
   */
  describe("The New Map Component #", function() {
    var dashboard = new Dashboard();

    dashboard.init();

    var newMap = new NewMapComponent({
      type: "NewMapComponent",
      name: "newMap",
      executeAtStart: true,
      htmlObject: "sampleObject",
      parameters: [],
      listeners: [],
      tilesets: "mapquest"
    });

    dashboard.addComponent(newMap);

    // inject sampleObject div
    $htmlObject = $('<div>').attr('id', newMap.htmlObject);

    /**
     * ## The New Map Component # allows a dashboard to execute update
     */
    it("allows a dashboard to execute update", function(done) {
      $('body').append($htmlObject);

      spyOn(newMap, 'update').and.callThrough();
      spyOn($, "ajax").and.callFake(function(params) {});

      // listen to cdf:postExecution event
      newMap.once("cdf:postExecution", function() {
        expect(newMap.update).toHaveBeenCalled();
        $htmlObject.remove();
        done();
      });

      dashboard.update(newMap);
    });
  });
});

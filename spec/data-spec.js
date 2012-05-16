describe('Mechanic Data Module', function() {
    it('has a name selector function that returns the first element\'s name', function() {
        var text = new UIAStaticText();
        spyOn(text, 'name').andReturn('name1');
        var win = new UIAWindow();

        var sel = $([text, win]);

        expect(sel.name()).toEqual('name1');
        expect(text.name).toHaveBeenCalled();
    });

    it('returns null when name is called on an empty selector', function() {
        var sel = $();

        expect(sel.name()).toEqual(null);
    });

    it('has a label selector function that returns the first element\'s label', function() {
        var mySwitch = new UIASwitch();
        spyOn(mySwitch, 'label').andReturn('switchname');
        var table = new UIATableView();

        var sel = $([mySwitch, table]);

        expect(sel.label()).toEqual('switchname');
        expect(mySwitch.label).toHaveBeenCalled();
    });

    it('returns null when label is called on an empty selector', function() {
        var sel = $();

        expect(sel.label()).toEqual(null);
    });

    it('has a value selector function that returns the first element\'s value', function() {
        var link = new UIALink();
        spyOn(link, 'value').andReturn('linkvalue');
        var table = new UIATableView();

        var sel = $([link, table]);

        expect(sel.value()).toEqual('linkvalue');
        expect(link.value).toHaveBeenCalled();
    });

    it('returns null when value is called on an empty selector', function() {
        var sel = $();

        expect(sel.value()).toEqual(null);
    });

    it('has an isFocused selector function that returns whether or not the first element is focused', function() {
        var link = new UIALink();
        spyOn(link, 'hasKeyboardFocus').andReturn(true);
        var image = new UIAImage();

        var sel = $([link, image]);

        expect(sel.isFocused()).toEqual(true);
        expect(link.hasKeyboardFocus).toHaveBeenCalled();
    });

    it('returns false when isFocused is called on an empty selector', function() {
        var sel = $();

        expect(sel.isFocused()).toEqual(false);
    });
    
    it('has an isEnabled selector function that returns whether or not the first element is enabled', function() {
        var scroll = new UIAScrollView();
        spyOn(scroll, 'isEnabled').andReturn(true);
        var tabbar = new UIATabBar();

        var sel = $([scroll, tabbar]);

        expect(sel.isEnabled()).toEqual(true);
        expect(scroll.isEnabled).toHaveBeenCalled();
    });

    it('returns false when isEnabled is called on an empty selector', function() {
        var sel = $();

        expect(sel.isEnabled()).toEqual(false);
    });
    

    it('has an isVisible selector function that returns whether or not the first element is visible', function() {
        var scroll = new UIAScrollView();
        spyOn(scroll, 'isVisible').andReturn(true);
        var tabbar = new UIATabBar();

        var sel = $([scroll, tabbar]);

        expect(sel.isVisible()).toEqual(true);
        expect(scroll.isVisible).toHaveBeenCalled();
    });

    it('returns false when isVisible is called on an empty selector', function() {
        var sel = $();

        expect(sel.isVisible()).toEqual(false);
    });

    it('has an isValid selector function that returns whether or not the element in the selector is valid', function() {
        var win = new UIAWindow();
        spyOn(win, 'isValid').andReturn(true);

        var sel = $(win);

        expect(sel.isValid()).toEqual(true);
        expect(win.isValid).toHaveBeenCalled();
    });

    it('will internally use checkIsValid for isValid selector function when true argument is passed in', function() {
        var win = new UIAWindow();
        spyOn(win, 'checkIsValid').andReturn(true);
        spyOn(win, 'isValid');
        win.checkIsValid(true);

        var sel = $(win);

        expect(sel.isValid(true)).toEqual(true);
        expect(win.checkIsValid).toHaveBeenCalled();
        expect(win.isValid).not.toHaveBeenCalled();
    });

    it('returns false when isValid is called on a selector not containing 1 element', function() {
        var win = new UIAWindow();
        spyOn(win, 'isValid');
        var tab = new UIATabBar();
        spyOn(tab, 'isValid');

        var sel = $([win, tab]);

        expect(sel.isValid()).toEqual(false);
        expect(win.isValid).not.toHaveBeenCalled();
        expect(tab.isValid).not.toHaveBeenCalled();
    });

    describe('mechanic global data functions', function() {
        var app = UIATarget.localTarget().frontMostApp();

        it('uses frontMostApp\'s version() to get app version', function() {
           spyOn(app, 'version');

           $.version();

           expect(app.version).toHaveBeenCalled();
       });

       it('uses frontMostApp\'s bundleID to get app\'s bundle ID', function() {
           spyOn(app, 'bundleID');

           $.bundleID();

           expect(app.bundleID).toHaveBeenCalled();
       });

       it('sets app preferences for each key/value passed into prefs()', function() {
           spyOn(app, 'setPreferencesValueForKey');

           $.prefs({
               'pref1': 1234,
               'pref2': 'abcd'
           });

           expect(app.setPreferencesValueForKey).toHaveBeenCalledWith(1234, 'pref1');
           expect(app.setPreferencesValueForKey).toHaveBeenCalledWith('abcd', 'pref2');
       });

        it('returns the value for the preference specified by the key when prefs is passed a string', function() {
            spyOn(app, 'preferencesValueForKey').andReturn('val');

            var returnedValue = $.prefs('pref1');

            expect(app.preferencesValueForKey).toHaveBeenCalledWith('pref1');
            expect(returnedValue).toBe('val');
        });
    });
});
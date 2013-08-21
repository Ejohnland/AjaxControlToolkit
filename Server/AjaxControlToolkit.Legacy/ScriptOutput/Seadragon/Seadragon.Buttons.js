// (c) 2010 CodePlex Foundation
Type.registerNamespace("Sys.Extended.UI.Seadragon");Type.registerNamespace("Seadragon");Sys.Extended.UI.Seadragon.ButtonState=function(){throw Error.invalidOperation();};Sys.Extended.UI.Seadragon.ButtonState.prototype={REST:0,GROUP:1,HOVER:2,DOWN:3};Sys.Extended.UI.Seadragon.ButtonState.registerEnum("Sys.Extended.UI.Seadragon.ButtonState",false);Sys.Extended.UI.Seadragon.Button=function(){var b=null,a=this;Sys.Extended.UI.Seadragon.Button.initializeBase(a);a._tooltip=b;a._srcRest=b;a._srcGroup=b;a._srcHover=b;a._srcDown=b;a._button=b;a.config=b};Sys.Extended.UI.Seadragon.Button.prototype={initialize:function(){var a=this;Sys.Extended.UI.Seadragon.Button.callBaseMethod(a,"initialize");a._button=Seadragon.Utils.makeNeutralElement("span");a._currentState=Sys.Extended.UI.Seadragon.ButtonState.GROUP;a._tracker=new Seadragon.MouseTracker(a._button,a.config.clickTimeThreshold,a.config.clickDistThreshold);a._imgRest=Seadragon.Utils.makeTransparentImage(a._srcRest);a._imgGroup=Seadragon.Utils.makeTransparentImage(a._srcGroup);a._imgHover=Seadragon.Utils.makeTransparentImage(a._srcHover);a._imgDown=Seadragon.Utils.makeTransparentImage(a._srcDown);a._fadeDelay=0;a._fadeLength=2e3;a._fadeBeginTime=null;a._shouldFade=false;a._button.style.display="inline-block";a._button.style.position="relative";a._button.title=a._tooltip;a._button.appendChild(a._imgRest);a._button.appendChild(a._imgGroup);a._button.appendChild(a._imgHover);a._button.appendChild(a._imgDown);var e=a._imgRest.style,d=a._imgGroup.style,b=a._imgHover.style,c=a._imgDown.style;d.position=b.position=c.position="absolute";d.top=b.top=c.top="0px";d.left=b.left=c.left="0px";b.visibility=c.visibility="hidden";if(Seadragon.Utils.getBrowser()==Seadragon.Browser.FIREFOX&&Seadragon.Utils.getBrowserVersion()<3)d.top=b.top=c.top="";a._tracker.enterHandler=Function.createDelegate(a,a._enterHandler);a._tracker.exitHandler=Function.createDelegate(a,a._exitHandler);a._tracker.pressHandler=Function.createDelegate(a,a._pressHandler);a._tracker.releaseHandler=Function.createDelegate(a,a._releaseHandler);a._tracker.clickHandler=Function.createDelegate(a,a._clickHandler);a._tracker.setTracking(true);a._outTo(Sys.Extended.UI.Seadragon.ButtonState.REST)},dispose:function(){},_scheduleFade:function(){window.setTimeout(Function.createDelegate(this,this._updateFade),20)},_updateFade:function(){var b=this;if(b._shouldFade){var c=(new Date).getTime(),d=c-b._fadeBeginTime,a=1-d/b._fadeLength;a=Math.min(1,a);a=Math.max(0,a);Seadragon.Utils.setElementOpacity(b._imgGroup,a,true);a>0&&b._scheduleFade()}},_beginFading:function(){var a=this;a._shouldFade=true;a._fadeBeginTime=(new Date).getTime()+a._fadeDelay;window.setTimeout(Function.createDelegate(a,a._scheduleFade),a._fadeDelay)},_stopFading:function(){this._shouldFade=false;Seadragon.Utils.setElementOpacity(this._imgGroup,1,true)},_inTo:function(b){var a=this;if(b>=Sys.Extended.UI.Seadragon.ButtonState.GROUP&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.REST){a._stopFading();a._currentState=Sys.Extended.UI.Seadragon.ButtonState.GROUP}if(b>=Sys.Extended.UI.Seadragon.ButtonState.HOVER&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.GROUP){a._imgHover.style.visibility="";a._currentState=Sys.Extended.UI.Seadragon.ButtonState.HOVER}if(b>=Sys.Extended.UI.Seadragon.ButtonState.DOWN&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.HOVER){a._imgDown.style.visibility="";a._currentState=Sys.Extended.UI.Seadragon.ButtonState.DOWN}},_outTo:function(b){var a=this;if(b<=Sys.Extended.UI.Seadragon.ButtonState.HOVER&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.DOWN){a._imgDown.style.visibility="hidden";a._currentState=Sys.Extended.UI.Seadragon.ButtonState.HOVER}if(b<=Sys.Extended.UI.Seadragon.ButtonState.GROUP&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.HOVER){a._imgHover.style.visibility="hidden";a._currentState=Sys.Extended.UI.Seadragon.ButtonState.GROUP}if(a._newState<=Sys.Extended.UI.Seadragon.ButtonState.REST&&a._currentState==Sys.Extended.UI.Seadragon.ButtonState.GROUP){a._beginFading();a._currentState=Sys.Extended.UI.Seadragon.ButtonState.REST}},_enterHandler:function(e,d,b,c){var a=this;if(b){a._inTo(Sys.Extended.UI.Seadragon.ButtonState.DOWN);a._raiseEvent("onEnter",a)}else!c&&a._inTo(Sys.Extended.UI.Seadragon.ButtonState.HOVER)},_exitHandler:function(d,c,a){this._outTo(Sys.Extended.UI.Seadragon.ButtonState.GROUP);a&&this._raiseEvent("onExit",this)},_pressHandler:function(){this._inTo(Sys.Extended.UI.Seadragon.ButtonState.DOWN);this._raiseEvent("onPress",this)},_releaseHandler:function(e,d,b,c){var a=this;if(b&&c){a._outTo(Sys.Extended.UI.Seadragon.ButtonState.HOVER);a._raiseEvent("onRelease",a)}else if(b)a._outTo(Sys.Extended.UI.Seadragon.ButtonState.GROUP);else a._inTo(Sys.Extended.UI.Seadragon.ButtonState.HOVER)},_clickHandler:function(c,b,a){a&&this._raiseEvent("onClick",this)},_raiseEvent:function(c,a){var b=this.get_events().getHandler(c);if(b){if(!a)a=Sys.EventArgs.Empty;b(this,a)}},get_element:function(){return this._button},get_tooltip:function(){return this._tooltip},set_tooltip:function(a){this._tooltip=a},get_config:function(){return this.config},set_config:function(a){this.config=a},get_srcRest:function(){return this._srcRest},set_srcRest:function(a){this._srcRest=a},get_srcGroup:function(){return this._srcGroup},set_srcGroup:function(a){this._srcGroup=a},get_srcHover:function(){return this._srcHover},set_srcHover:function(a){this._srcHover=a},get_srcDown:function(){return this._srcDown},set_srcDown:function(a){this._srcDown=a},add_onPress:function(a){this.get_events().addHandler("onPress",a)},remove_onPress:function(a){this.get_events().removeHandler("onPress",a)},add_onClick:function(a){this.get_events().addHandler("onClick",a)},remove_onClick:function(a){this.get_events().removeHandler("onClick",a)},add_onEnter:function(a){this.get_events().addHandler("onEnter",a)},remove_onEnter:function(a){this.get_events().removeHandler("onEnter",a)},add_onRelease:function(a){this.get_events().addHandler("onRelease",a)},remove_onRelease:function(a){this.get_events().removeHandler("onRelease",a)},add_onExit:function(a){this.get_events().addHandler("onExit",a)},remove_onExit:function(a){this.get_events().removeHandler("onExit",a)},notifyGroupEnter:function(){this._inTo(Sys.Extended.UI.Seadragon.ButtonState.GROUP)},notifyGroupExit:function(){this._outTo(Sys.Extended.UI.Seadragon.ButtonState.REST)}};Sys.Extended.UI.Seadragon.Button.registerClass("Sys.Extended.UI.Seadragon.Button",Sys.Component);Sys.Extended.UI.Seadragon.ButtonGroup=function(){var a=this;Sys.Extended.UI.Seadragon.ButtonGroup.initializeBase(a);a._buttons=null;a._group=null;a.config=null};Sys.Extended.UI.Seadragon.ButtonGroup.prototype={initialize:function(){var a=this;Sys.Extended.UI.Seadragon.ButtonGroup.callBaseMethod(a,"initialize");a._group=Seadragon.Utils.makeNeutralElement("span");var d=a._buttons.concat([]),b=new Seadragon.MouseTracker(a._group,a.config.clickTimeThreshold,a.config.clickDistThreshold);a._group.style.display="inline-block";for(var c=0;c<d.length;c++)a._group.appendChild(d[c].get_element());b.enterHandler=Function.createDelegate(a,a._enterHandler);b.exitHandler=Function.createDelegate(a,a._exitHandler);b.releaseHandler=Function.createDelegate(a,a._releaseHandler);b.setTracking(true)},dispose:function(){},get_buttons:function(){return this._buttons},set_buttons:function(a){this._buttons=a},get_element:function(){return this._group},get_config:function(){return this.config},set_config:function(a){this.config=a},_enterHandler:function(){for(var a=0;a<this._buttons.length;a++)this._buttons[a].notifyGroupEnter()},_exitHandler:function(e,d,b){if(!b)for(var a=0;a<this._buttons.length;a++)this._buttons[a].notifyGroupExit()},_releaseHandler:function(e,d,c,b){if(!b)for(var a=0;a<this._buttons.length;a++)this._buttons[a].notifyGroupExit()},emulateEnter:function(){this._enterHandler()},emulateExit:function(){this._exitHandler()}};Sys.Extended.UI.Seadragon.ButtonGroup.registerClass("Sys.Extended.UI.Seadragon.ButtonGroup",Sys.Component);
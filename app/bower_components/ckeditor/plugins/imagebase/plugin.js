﻿/*
 Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 CKEditor 4 LTS ("Long Term Support") is available under the terms of the Extended Support Model.
*/
(function(){function p(c){var a=c.widgets,b=c.focusManager.currentActive;if(c.focusManager.hasFocus){if(a.focused)return a.focused;if(b instanceof CKEDITOR.plugins.widget.nestedEditable)return a.getByElement(b)}}function l(c,a){return c.features&&-1!==CKEDITOR.tools.array.indexOf(c.features,a)}function t(c,a){return CKEDITOR.tools.array.reduce(CKEDITOR.tools.object.keys(c),function(b,d){var e=c[d];l(e,a)&&b.push(e);return b},[])}function u(c,a){a=CKEDITOR.tools.object.merge({pathName:c.lang.imagebase.pathName,
defaults:{imageClass:c.config.easyimage_class||"",alt:"",src:"",caption:""},template:'\x3cfigure class\x3d"{imageClass}"\x3e\x3cimg alt\x3d"{alt}" src\x3d"{src}" /\x3e\x3cfigcaption\x3e{caption}\x3c/figcaption\x3e\x3c/figure\x3e',allowedContent:{img:{attributes:"!src,alt,width,height"},figure:!0,figcaption:!0},requiredContent:"figure; img[!src]",features:[],editables:{caption:{selector:"figcaption",pathName:c.lang.imagebase.pathNameCaption,allowedContent:"br em strong sub sup u s; a[!href,target]"}},
parts:{image:"img",caption:"figcaption"},upcasts:{figure:function(b){if(1===b.find("img",!0).length)return b}}},a);a.upcast=CKEDITOR.tools.object.keys(a.upcasts).join(",");return a}function m(c){this.wrapper=CKEDITOR.dom.element.createFromHtml(c||'\x3cdiv class\x3d"cke_loader"\x3e\x3c/div\x3e')}function n(){m.call(this,'\x3cdiv class\x3d"cke_loader"\x3e\x3cdiv class\x3d"cke_bar" styles\x3d"transition: width '+q/1E3+'s"\x3e\x3c/div\x3e\x3c/div\x3e');this.bar=this.wrapper.getFirst()}var r=!1,v={caption:function(){function c(b){b.parts.caption.data("cke-caption-placeholder",
!1)}function a(b,a){b.data("cke-caption-active",a);b.data("cke-caption-hidden",!a)}return{setUp:function(b){function a(d){var f=(d="blur"===d.name?b.elementPath():d.data.path)?d.lastElement:null;d=t(b.widgets.instances,"caption");if(!b.filter.check("figcaption"))return CKEDITOR.tools.array.forEach(c,function(a){a.removeListener()});CKEDITOR.tools.array.forEach(d,function(a){a._refreshCaption(f)})}var c=[];c.push(b.on("selectionChange",a,null,null,9));c.push(b.on("blur",a))},init:function(){if(this.editor.filter.check("figcaption")){if(!this.parts.caption){var a=
this.parts,d=this.element,c=d.getDocument().createElement("figcaption");d.append(c);this.initEditable("caption",this.definition.editables.caption);a.caption=c}this.editables.caption.getData()||this.parts.caption.data("cke-caption-placeholder")||this._refreshCaption()}},_refreshCaption:function(b){var d=p(this.editor)===this,e=this.parts.caption,g=this.editables.caption;if(d)g.getData()||b.equals(e)?(!b||b.equals(e)&&b.data("cke-caption-placeholder"))&&c(this):this.parts.caption.data("cke-caption-placeholder",
this.editor.lang.imagebase.captionPlaceholder),a(e,!0);else if(!this.editables.caption.getData()||this.parts.caption.data("cke-caption-placeholder"))c(this),a(e,!1)}}}(),upload:function(){var c={progressReporterType:n,setUp:function(a,b){a.on("paste",function(d){var e=d.data.dataTransfer,g=e&&e.isFileTransfer(),f=e&&e.getFilesCount();if(!a.readOnly&&g){var h=[];b=a.widgets.registered[b.name];for(var k=0;k<f;k++)g=e.getFile(k),CKEDITOR.fileTools.isTypeSupported(g,b.supportedTypes)&&h.push(g);0!==h.length&&
(d.cancel(),d.stop(),CKEDITOR.tools.array.forEach(h,function(d,e){var g=c._spawnLoader(a,d,b,d.name);c._insertWidget(a,b,URL.createObjectURL(d),!0,{uploadId:g.id});e!==h.length-1&&(g=a.getSelection().getRanges(),g[0].enlarge(CKEDITOR.ENLARGE_ELEMENT),g[0].collapse(!1))}))}})},init:function(){this.once("ready",function(){var a=this.data.uploadId;"undefined"!==typeof a&&(a=this.editor.uploadRepository.loaders[a])&&this._beginUpload(this,a)})},_isLoaderDone:function(a){return a.xhr&&4===a.xhr.readyState},
_spawnLoader:function(a,b,d,c){var g=d.loadMethod||"loadAndUpload";a=a.uploadRepository.create(b,c,d.loaderType);a[g](d.uploadUrl,d.additionalRequestParameters);return a},_beginUpload:function(a,b){function c(){a.isInited()&&a.setData("uploadId",void 0);a.wrapper.removeClass("cke_widget_wrapper_uploading")}function e(){c();!1!==a.fire("uploadFailed",{loader:b})&&a.editor.widgets.del(a)}var g={uploaded:function(){c();a.fire("uploadDone",{loader:b})},abort:e,error:e},f=[];f.push(b.on("abort",g.abort));
f.push(b.on("error",g.error));f.push(b.on("uploaded",g.uploaded));this.on("destroy",function(){CKEDITOR.tools.array.filter(f,function(a){a.removeListener();return!1})});a.setData("uploadId",b.id);if(!1!==a.fire("uploadStarted",b)&&a.progressReporterType)if(!a._isLoaderDone(b))a.wrapper.addClass("cke_widget_wrapper_uploading"),g=new a.progressReporterType,a.wrapper.append(g.wrapper),g.bindLoader(b);else if(g[b.status])g[b.status]()},_insertWidget:function(a,b,c,e,g){var f=("function"==typeof b.defaults?
b.defaults():b.defaults)||{},f=CKEDITOR.tools.extend({},f);f.src=c;c=CKEDITOR.dom.element.createFromHtml(b.template.output(f));var f=a.widgets.wrapElement(c,b.name),h=new CKEDITOR.dom.documentFragment(f.getDocument());h.append(f);return!1!==e?(a.widgets.initOn(c,b,g),a.widgets.finalizeCreation(h)):c}};return c}(),link:function(){function c(a){a.addMenuGroup("imagebase",10);a.addMenuItem("imagebase",{label:a.lang.link.menu,command:"link",group:"imagebase"})}function a(a,c,b){return function(){if(b&&
l(b,"link")){a.stop();var f={};c.commitContent(f);b.setData("link",f)}}}function b(a,c,b){a.getCommand("unlink").on(c,function(c){var e=p(a);e&&l(e,"link")&&(c.stop(),b&&"function"===typeof b&&b(this,e,a),c.cancel())})}return{allowedContent:{a:{attributes:"!href"}},parts:{link:"a"},init:function(){if(this.editor.plugins.link&&this.editor.contextMenu)this.on("contextMenu",function(a){this.parts.link&&(a.data.link=a.data.unlink=CKEDITOR.TRISTATE_OFF)})},setUp:function(d){d.plugins.link&&(d.contextMenu&&
c(d),d.on("dialogShow",function(c){var b=p(d),f=c.data,h,k;b&&l(b,"link")&&"link"===f._.name&&(h=f.getContentElement("info","linkDisplayText").getElement().getParent().getParent(),f.setupContent(b.data.link||{}),h.hide(),k=f.once("ok",a(c,f,b),null,null,9),f.once("hide",function(){k.removeListener();h.show()}))}),b(d,"exec",function(a,c,b){c.setData("link",null);a.refresh(b,b.elementPath())}),b(d,"refresh",function(a,b){a.setState(b.parts.link?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED)}))},
data:function(a){var b=this.editor,c=a.data.link,f=this.element.findOne("img");"undefined"===typeof c&&this.parts.link&&this.setData("link",CKEDITOR.plugins.link.parseLinkAttributes(this.editor,this.parts.link));if("undefined"!==typeof c)if(null===c)this.parts.link.remove(!0),this.parts.link=null,delete a.data.link;else{a=this.parts;var h=f.getAscendant("a")||b.document.createElement("a"),b=CKEDITOR.plugins.link.getLinkAttributes(b,c);CKEDITOR.tools.isEmpty(b.set)||h.setAttributes(b.set);b.removed.length&&
h.removeAttributes(b.removed);h.contains(f)||(h.replace(f),f.move(h));a.link=h}}}}()},q=100;m.prototype={updated:function(){},done:function(){this.remove()},aborted:function(){this.remove()},failed:function(){this.remove()},remove:function(){this.wrapper.remove()},bindLoader:function(c){function a(){b&&(CKEDITOR.tools.array.forEach(b,function(a){a.removeListener()}),b=null)}var b=[],d=CKEDITOR.tools.eventsBuffer(q,function(){c.uploadTotal&&this.updated(c.uploaded/c.uploadTotal)},this);b.push(c.on("update",
d.input,this));b.push(c.once("abort",this.aborted,this));b.push(c.once("uploaded",this.done,this));b.push(c.once("error",this.failed,this));b.push(c.once("abort",a));b.push(c.once("uploaded",a));b.push(c.once("error",a))}};n.prototype=new m;n.prototype.updated=function(c){c=Math.round(100*c);c=Math.max(c,0);c=Math.min(c,100);this.bar.setStyle("width",c+"%")};CKEDITOR.plugins.add("imagebase",{requires:"widget,filetools",lang:"az,bg,cs,da,de,de-ch,el,en,en-au,et,fa,fr,gl,hr,hu,it,ku,lt,lv,nb,nl,pl,pt,pt-br,ro,ru,sk,sq,sr,sr-latn,sv,tr,ug,uk,zh,zh-cn",
init:function(c){r||(CKEDITOR.document.appendStyleSheet(this.path+"styles/imagebase.css"),r=!0);c.addContentsCss&&c.addContentsCss(this.path+"styles/imagebase.css")}});CKEDITOR.plugins.imagebase={featuresDefinitions:v,addImageWidget:function(c,a,b){a=c.widgets.add(a,u(c,b));c.addFeature(a)},addFeature:function(c,a,b){function d(a,b){if(a||b)return function(){a&&a.apply(this,arguments);b&&b.apply(this,arguments)}}var e=CKEDITOR.tools.clone(this.featuresDefinitions[a]);e.init=d(b.init,e.init);e.data=
d(b.data,e.data);e.setUp&&(e.setUp(c,b),delete e.setUp);c=CKEDITOR.tools.object.merge(b,e);CKEDITOR.tools.isArray(c.features)||(c.features=[]);c.features.push(a);return c},progressBar:n,progressReporter:m}})();
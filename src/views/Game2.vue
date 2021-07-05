<template>
  <div>
    <button @click="init">click</button>
  </div>
  <audio src="silence.mp3" autoplay="autoplay" loop=false></audio>
  <div id="animation_container" style="background-color:rgba(255, 255, 255, 1.00); width:1650px; height:1080px">
    <canvas id="canvas" width="1650" height="1080"
      style="position: absolute; display: none; background-color:rgba(255, 255, 255, 1.00);"></canvas>
    <div id="dom_overlay_container"
      style="pointer-events:none; overflow:hidden; width:1650px; height:1080px; position: absolute; left: 0px; top: 0px; display: none;">
    </div>
  </div>
  <div id='_preload_div_'
    style='position:absolute; top:0; left:0; display: inline-block; height:1080px; width: 1650px; text-align: center;'>
    <span style='display: inline-block; height: 100%; vertical-align: middle;'></span>
    <img src=images/_preloader.gif?1623646073409 style='vertical-align: middle; max-height: 100%' />
  </div>
</template>
<script src="https://code.createjs.com/1.0.0/createjs.min.js"></script>
<script src='/public/js/HLE.bundle.js'></script>
<script src="/public/js/P008P009_ExWord.js"></script>
<script>
  let pageUseWebGL = true;

  let canvas, anim_container, dom_overlay_container;

  function getHtmlhrefValue(varname) {
    if (window) {
      const url = decodeURI(window.location.href);
      const qparts = url.split('?');
      if (qparts.length <= 1) {
        return undefined;
      };
      const query = qparts[1];
      const vars = query.split('&');
      let value = '';
      let i;
      for (i = 0; i < vars.length; i++) {
        const parts = vars[i].split('=');
        if (parts[0] == varname) {
          value = parts[1];
          break;
        };
      }
      value = unescape(value);
      value.replace(/\+/g, ' ');
      console.log(value);
      return value;
    }
  }

  if (getHtmlhrefValue('pageUseWebGL') !== undefined) {
    pageUseWebGL = getHtmlhrefValue('pageUseWebGL') !== 'false';
  }

  function init() {
    let anim_id = Object.keys(AdobeAn.compositions)[0];
    canvas = document.getElementById("canvas");
    anim_container = document.getElementById("animation_container");
    dom_overlay_container = document.getElementById("dom_overlay_container");
    createjs.MotionGuidePlugin.install();
    let comp, loader;

    if (false) {
      comp = AdobeAn.getComposition("D3C6317925383F4CA5328EDF2334C569");
      loader = new createjs.LoadQueue(false);

      loader.installPlugin(createjs.Sound);
      loader.addEventListener("fileload", function (evt) {
        handleFileLoad(evt, comp)
      });
      loader.addEventListener("complete", function (evt) {
        handleComplete(evt, comp)
      });
    } else {
      comp = AdobeAn.getComposition(anim_id);
      loader = new createjs.LoadQueue(true, "", "Anonymous");

      loader.addEventListener("fileload", function (evt) {
        handleFileLoad(evt, comp)
      });
      loader.addEventListener("complete", function (evt) {
        handleComplete(evt, comp)
      });
      loader.setMaxConnections(6);
      loader.installPlugin(createjs.Sound);
    }
    let lib = comp.getLibrary();
    let i, max = lib.properties.manifest.length;
    let filter_manifest = [];
    for (i = 0; i < max; i++) {
      if (lib.properties.manifest[i].src.indexOf(".mp3") === -1) {
        filter_manifest.push(lib.properties.manifest[i]);
      }
    }
    let close_mp3_preload = true;
    if (close_mp3_preload) {
      if (filter_manifest.length !== 0) {
        loader.loadManifest(filter_manifest);
      } else {
        handleComplete({}, comp);
      }
    } else {
      if (lib.properties.manifest.length !== 0) {
        loader.loadManifest(lib.properties.manifest);
      } else {
        handleComplete({}, comp);
      }
    }
  }

  function handleFileLoad(evt, comp) {
    let images = comp.getImages();
    if (evt && (evt.item.type == "image")) {
      images[evt.item.id] = evt.result;
    }

    function handleFileLoad(evt, comp) {}
  }

  function handleComplete(evt, comp) {
    let stage, exportRoot;
    if (pageUseWebGL) {
      (comp.getLibrary().Stage = function (canvas) {
        let options = {
          transparent: true,
          antialias: false,
          premultiply: true
        };
        createjs.StageGL.call(this, canvas, options);
      }).prototype = p = new createjs.StageGL();
      AdobeAn.makeResponsive = function (isResp, respDim, isScale, scaleType, domContainers) {
        let lastW, lastH, lastS = 1;
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function resizeCanvas() {
          let w = lib.properties.width,
            h = lib.properties.height;
          let iw = window.innerWidth,
            ih = window.innerHeight;
          let pRatio = window.devicePixelRatio || 1,
            xRatio = iw / w,
            yRatio = ih / h,
            sRatio = 1;
          if (isResp) {
            if ((respDim == 'width' && lastW == iw) || (respDim == 'height' && lastH == ih)) {
              sRatio = lastS;
            } else if (!isScale) {
              if (iw < w || ih < h)
                sRatio = Math.min(xRatio, yRatio);
            } else if (scaleType == 1) {
              sRatio = Math.min(xRatio, yRatio);
            } else if (scaleType == 2) {
              sRatio = Math.max(xRatio, yRatio);
            }
          }
          domContainers[0].width = w * pRatio * sRatio;
          domContainers[0].height = h * pRatio * sRatio;
          domContainers.forEach(function (container) {
            container.style.width = w * sRatio + 'px';
            container.style.height = h * sRatio + 'px';
          });
          stage.setClearColor("rgba(255,255,255,1.0)");
          stage.scaleX = pRatio * sRatio;
          stage.scaleY = pRatio * sRatio;
          lastW = iw;
          lastH = ih;
          lastS = sRatio;
          stage.tickOnUpdate = false;
          stage.updateViewport(canvas.width, canvas.height);
          stage.tickOnUpdate = true;
          stage.update();
        }
      };
      canvas.style.backgroundColor = 'rgba(255, 255, 255, 0.00)';
    }
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    let lib = comp.getLibrary();
    let ss = comp.getSpriteSheet();
    let queue = evt.target;
    let ssMetadata = lib.ssMetadata;
    for (i = 0; i < ssMetadata.length; i++) {
      ss[ssMetadata[i].name] = new createjs.SpriteSheet({
        "images": [queue.getResult(ssMetadata[i].name)],
        "frames": ssMetadata[i].frames
      })
    }
    let preloaderDiv = document.getElementById("_preload_div_");
    preloaderDiv.style.display = 'none';
    canvas.style.display = 'block';
    exportRoot = new lib.P008P009_ExWord();
    stage = new lib.Stage(canvas);
    stage.enableMouseOver();
    stage.preventSelection = false;

    //createjs.Ticker.addEventListener("tick", stageBreakHandler);	    
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(true, 'both', true, 1, [canvas, preloaderDiv, anim_container,
      dom_overlay_container
    ]);
    AdobeAn.compositionLoaded(lib.properties.id);
    //Registers the "tick" event listener.
    (function () {
      stage.addChild(exportRoot);
      createjs.Ticker.framerate = lib.properties.fps;
      createjs.Ticker.addEventListener("tick", stage);
    })();
  }

  function playSound(id, loop) {
    alert('有影格音檔:' + id + ' 存在，請清除');
  }

  export default {
    mounted() {
      this.init();
    },
    methods: {
      init,
      handleFileLoad,
      handleComplete,
      playSound,
    },
  }

</script>

<style scoped>
  #animation_container {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #_preload_div_ {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100% !important;
    height: 100% !important;
  }

  #animation_container {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

</style>

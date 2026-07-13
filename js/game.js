createUnityInstance(
  document.querySelector("#unity-container"),

  {
    dataUrl: "UnityGame/Build/game.data",

    frameworkUrl: "UnityGame/Build/game.framework.js",

    codeUrl: "UnityGame/Build/game.wasm",

    streamingAssetsUrl: "StreamingAssets",

    companyName: "GRAN",

    productName: "Pocket Dimension",

    productVersion: "1.0",
  },
);
const canvas = document.querySelector("#unity-canvas");

createUnityInstance(canvas, {
  dataUrl: "UnityGame/Build/game.data",

  frameworkUrl: "UnityGame/Build/game.framework.js",

  codeUrl: "UnityGame/Build/game.wasm",

  companyName: "GRAN",

  productName: "Карманное измерение",

  productVersion: "1.0",
});

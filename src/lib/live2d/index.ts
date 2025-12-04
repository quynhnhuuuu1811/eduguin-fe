// // lib/live2d/index.ts
// // file này chạy trên browser, dùng trong useEffect / dynamic import

// import * as Cubism from "../CubismWebFramework/dist";
// // vd: '../CubismWebFramework/dist' sau khi bạn build repo đó

// export async function createLive2DApp(
//   canvas: HTMLCanvasElement,
//   modelJsonPath: string
// ) {
//   const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
//   if (!gl) throw new Error("WebGL not supported");

//   const model = await Cubism.loadModel(gl, modelJsonPath);
//   const app = new Cubism.App(gl, model);

//   app.start();

//   return {
//     destroy() {
//       app.stop();
//       app.release();
//     },
//   };
// }

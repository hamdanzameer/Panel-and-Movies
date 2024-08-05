// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })


// const { defineConfig } = require('@vue/cli-service');

// module.exports = defineConfig({
//   transpileDependencies: true,
//   chainWebpack: config => {
//     // Define feature flags for Vue
//     config.plugin('define').tap(args => {
//       Object.assign(args[0]['process.env'], {
//         __VUE_OPTIONS_API__: true,
//         __VUE_PROD_DEVTOOLS__: false,
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
//       });
//       return args;
//     });
//   }
// });

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    // Define feature flags for Vue
    config.plugin('define').tap(args => {
      Object.assign(args[0]['process.env'], {
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true
      });
      return args;
    });

   
  }
});

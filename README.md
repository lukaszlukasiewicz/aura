# Aura konfigurator

Konfigurator donic Aura Concept.

To insert the configurator add div with id "aura-configurator" and include the script

```
  <div id="aura-configurator"></div>	
  <script async src="./configurator/auraConfigurator.js"></script>
```
to debug current state of product add "configurator-debug" prop to the container div:

```
  <div id="aura-configurator" data-configurator-debug></div>	
```
To set initial configuration pass configuration object to the window.AuraConfiguratorInitialState prop. The object has to have property material set to either "wood", "metal" or "composite".
```
  <script>
     window.AuraConfiguratorInitialState = {
       material : "wood",
       cornerType : "round,
     }
  </script>
```
Values for specific configuration options can be found either using debug view or in src/config.js file

To insert the list button add element with class "aura-list__container". You can put as many copies as you wish.

```
  <div class="aura-list__container"></div>
```



## CLI Commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).

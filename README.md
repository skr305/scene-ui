# Scene-UI:A simple ui-component-lib with simple style

The scene-ui component library is an **open source component library** maintained by the students of the School of Software of ShanDong University.

**Now a total of 15 basic components, 3 scene components, and 2 ui-method components can be used.**

Main technology stack:  Vue3+TypeScript

Features: 

* out-of-the-box,
* scene components
*  low-code development platform（not available）

Our website: https://sunburst7.github.io/scene-ui/

The three of us are rookies, and hope make progress together with the mature devloper.

## quick start

First you need to install the latest version of Scene-UI:

```
npm i scene-ui --save		//produce environment
npm i scene-ui --save-dev	//develop environment
```

Then you need to import our global CSS styles in main.ts or elsewhere:

```typescript
import 'scene-ui/style'
```

Then import the components you need as needed:

```vue
<script setup lang="ts">
import { SButton } from 'scene-ui'
</script>
<template>
	<s-button>test</s-button>
</template>    
```

## update version

It is recommended to delete the scene-ui dependency package from node_mudules, and then use npm to download it again




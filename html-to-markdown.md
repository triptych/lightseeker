KAPLAY, Reference Documentation

![hamburger icon](/_astro/hamburger.DtTOoMm__I9lEQ.webp)

KAPLAY.js is open source (MIT) and free to use. [Consider sponsoring ❤](https://opencollective.com/kaplay)



[kaplay](#kaplay)(gopt?: KAPLAYOpt)
===================================

Initialize KAPLAY context. The starting point of all KAPLAY games.

    // Start KAPLAY with default options (will create a fullscreen canvas under <body>)
    kaplay()

    // Init with some options
    kaplay({
        width: 320,
        height: 240,
        font: "sans-serif",
        canvas: document.querySelector("#mycanvas"),
        background: [ 0, 0, 255, ],
    })

    // All KAPLAY functions are imported to global after calling kaplay()
    add()
    onUpdate()
    onKeyPress()
    vec2()

    // If you want to prevent KAPLAY from importing all functions to global and use a context handle for all KAPLAY functions
    const k = kaplay({ global: false })

    k.add(...)
    k.onUpdate(...)
    k.onKeyPress(...)
    k.vec2(...)




[quit](#quit)(): void
=====================

End everything.

`since`v2000.0



[KAPLAYOpt](#KAPLAYOpt)<TPlugin, TButtonDef\>:
==============================================

KAPLAY configurations.

[width](#KAPLAYOpt-width)?: number
==================================

Width of game.

[height](#KAPLAYOpt-height)?: number
====================================

Height of game.

[scale](#KAPLAYOpt-scale)?: number
==================================

Pixel scale / size.

[stretch](#KAPLAYOpt-stretch)?: boolean
=======================================

If stretch canvas to container when width and height is specified

[letterbox](#KAPLAYOpt-letterbox)?: boolean
===========================================

When stretching if keep aspect ratio and leave black bars on remaining spaces.

[debug](#KAPLAYOpt-debug)?: boolean
===================================

If register debug buttons (default true)

[debugKey](#KAPLAYOpt-debugKey)?: Key
=====================================

Key that toggles debug mode

[font](#KAPLAYOpt-font)?: string
================================

Default font (defaults to "monospace").

[pixelDensity](#KAPLAYOpt-pixelDensity)?: number
================================================

Device pixel scale (defaults to 1, high pixel density will hurt performance).

`since`v3000.0

[crisp](#KAPLAYOpt-crisp)?: boolean
===================================

Disable antialias and enable sharp pixel display.

[canvas](#KAPLAYOpt-canvas)?: HTMLCanvasElement
===============================================

The canvas DOM element to use. If empty will create one.

[root](#KAPLAYOpt-root)?: HTMLElement
=====================================

The container DOM element to insert the canvas if created. Defaults to document.body.

[background](#KAPLAYOpt-background)?: RGBValue | RGBAValue | string
===================================================================

Background color. E.g. \[ 0, 0, 255 \] for solid blue background, or \[ 0, 0, 0, 0 \] for transparent background. Accepts RGB value array or string hex codes.

[texFilter](#KAPLAYOpt-texFilter)?: TexFilter
=============================================

Default texture filter.

[logMax](#KAPLAYOpt-logMax)?: number
====================================

How many log messages can there be on one screen (default 8).

[logTime](#KAPLAYOpt-logTime)?: number
======================================

How many seconds log messages stay on screen (default 4).

`since`v3000.1

[hashGridSize](#KAPLAYOpt-hashGridSize)?: number
================================================

Size of the spatial hash grid for collision detection (default 64).

`since`v3000.0

[touchToMouse](#KAPLAYOpt-touchToMouse)?: boolean
=================================================

If translate touch events as mouse clicks (default true).

[loadingScreen](#KAPLAYOpt-loadingScreen)?: boolean
===================================================

If KAPLAY should render a default loading screen when assets are not fully ready (default true).

`since`v3000.0

[backgroundAudio](#KAPLAYOpt-backgroundAudio)?: boolean
=======================================================

If pause audio when tab is not active (default false).

`since`v3000.0

[gamepads](#KAPLAYOpt-gamepads)?: Record<string, GamepadDef\>
=============================================================

Custom gamepad definitions (see gamepad.json for reference of the format).

`since`v3000.0

[buttons](#KAPLAYOpt-buttons)?: TButtonDef
==========================================

Defined buttons for input binding.

`since`v30010

[maxFPS](#KAPLAYOpt-maxFPS)?: number
====================================

Limit framerate to an amount per second.

`since`v3000.0

[focus](#KAPLAYOpt-focus)?: boolean
===================================

If focus on the canvas on start (default true).

`since`v3001.0

[global](#KAPLAYOpt-global)?: boolean
=====================================

If import all KAPLAY functions to global (default true).

[plugins](#KAPLAYOpt-plugins)?: TPlugin
=======================================

List of plugins to import.

[burp](#KAPLAYOpt-burp)?: boolean
=================================

Enter burp mode.

[tagsAsComponents](#KAPLAYOpt-tagsAsComponents)?: boolean
=========================================================

Make component's id ("sprite" for sprite() comp) be added as tags. That means .is() will return true for components with that id.

`default`true

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0



[loadRoot](#loadRoot)(path?: string): string
============================================

Sets the root for all subsequent resource urls. This is useful when you want to load assets from a different domain, or setup a base path for all assets.

`param`path\- The root path.

    loadRoot("https://myassets.com/");
    loadSprite("bean", "sprites/bean.png"); // will resolve to "https://myassets.com/sprites/bean.png"

    loadRoot("./"); // useful for Itch.io




[loadSprite](#loadSprite)(name: string | null, src: LoadSpriteSrc | LoadSpriteSrc\[\], opt?: LoadSpriteOpt): Asset<SpriteData\>
===============================================================================================================================

Load a sprite into asset manager, with name and resource url and optional config.

`param`name\- The asset name.

`param`src\- The resource url.

`param`opt\- The optional config.

    // due to browser policies you'll need a static file server to load local files
    loadSprite("bean", "bean.png");
    loadSprite("apple", "https://play.kaplayjs.com/sprites/apple.png");

    // slice a spritesheet and add anims manually
    loadSprite("bean", "bean.png", {
        sliceX: 4,
        sliceY: 1,
        anims: {
            run: {
                from: 0,
                to: 3,
            },
            jump: {
                from: 3,
                to: 3,
            },
        },
    });


`returns`The asset data.

`since`v2000.0



[loadSpriteAtlas](#loadSpriteAtlas)(src: LoadSpriteSrc, data: SpriteAtlasData): Asset<Record\>
==============================================================================================

Load sprites from a sprite atlas.

`param`src\- The image resource url.

`param`data\- The sprite atlas data.

    // See #SpriteAtlasData type for format spec
    loadSpriteAtlas("sprites/dungeon.png", {
        "hero": {
            x: 128,
            y: 68,
            width: 144,
            height: 28,
            sliceX: 9,
            anims: {
                idle: { from: 0, to: 3 },
                run: { from: 4, to: 7 },
                hit: 8,
            },
        },
    });

    const player = add([
        sprite("hero"),
    ]);

    player.play("run");


`returns`The asset data.

`since`v2000.0



[loadSpriteAtlas](#loadSpriteAtlas)(src: LoadSpriteSrc, url: string): Asset<Record\>
====================================================================================

Load sprites from a sprite atlas with URL.

`param`src\- The image resource url.

`param`url\- The json resource url.

    // Load from json file, see #SpriteAtlasData type for format spec
    loadSpriteAtlas("sprites/dungeon.png", "sprites/dungeon.json")

    const player = add([
        sprite("hero"),
    ])

    player.play("run")


`returns`The asset data.

`since`v2000.0



[loadAseprite](#loadAseprite)(name: string | null, imgSrc: LoadSpriteSrc, jsonSrc: string | AsepriteData): Asset<SpriteData\>
=============================================================================================================================

Load a sprite with aseprite spritesheet json (should use "array" in the export options).

`param`name\- The asset name.

`param`imgSrc\- The image resource url.

    loadAseprite("car", "sprites/car.png", "sprites/car.json")


`returns`The asset data.

`since`v2000.0



[loadPedit](#loadPedit)(name: string | null, src: string): Asset<SpriteData\>
=============================================================================

`param`name\- The asset name.

`param`src\- The resource url. Load .pedit file.

`deprecated`The format is not supported anymore.

`returns`The asset data.

`since`v2000.0



[loadBean](#loadBean)(name?: string): Asset<SpriteData\>
========================================================

Load default sprite "bean".

`param`name\- The optional name for bean.

    loadBean();

    // use it right away
    add([
        sprite("bean"),
    ]);


`returns`The asset data.

`since`v2000.0



[loadJSON](#loadJSON)(name: string | null, url: string): Asset<any\>
====================================================================

Load custom JSON data from url.

`param`name\- The asset name.

`param`url\- The resource url.

`returns`The asset data.

`since`v3000.0



[loadSound](#loadSound)(name: string | null, src: string | ArrayBuffer | AudioBuffer): Asset<SoundData\>
========================================================================================================

Load a sound into asset manager, with name and resource url. Supported formats: mp3, ogg, wav.

`param`name\- The asset name.

`param`src\- The resource url.

    loadSound("shoot", "/sounds/horse.ogg");
    loadSound("shoot", "/sounds/squeeze.mp3");
    loadSound("shoot", "/sounds/shoot.wav");


`returns`The asset data.

`since`v2000.0



[loadMusic](#loadMusic)(name: string | null, url: string): void
===============================================================

Like loadSound(), but the audio is streamed and won't block loading. Use this for big audio files like background music.

`param`name\- The asset name.

`param`url\- The resource url.

    loadMusic("shoot", "/music/bossfight.mp3");


`returns`The asset data.

`since`v3001.0



[loadFont](#loadFont)(name: string, src: string | BinaryData, opt?: LoadFontOpt): Asset<FontData\>
==================================================================================================

Load a font (any format supported by the browser, e.g. ttf, otf, woff).

`param`name\- The asset name.

    // load a font from a .ttf file
    loadFont("frogblock", "fonts/frogblock.ttf");


`returns`The asset data.

`since`v3000.0



[loadBitmapFont](#loadBitmapFont)(name: string | null, src: string, gridW: number, gridH: number, opt?: LoadBitmapFontOpt): Asset<BitmapFontData\>
==================================================================================================================================================

Load a bitmap font into asset manager, with name and resource url and information on the layout of the bitmap.

`param`name\- The asset name.

`param`src\- The resource url.

`param`gridW\- The width of each character on the bitmap.

`param`gridH\- The height of each character on the bitmap.

`param`opt\- The options for the bitmap font.

    // load a bitmap font called "04b03", with bitmap "fonts/04b03.png"
    // each character on bitmap has a size of (6, 8), and contains default ASCII_CHARS
    loadBitmapFont("04b03", "fonts/04b03.png", 6, 8);

    // load a font with custom characters
    loadBitmapFont("myfont", "myfont.png", 6, 8, { chars: "☺☻♥♦♣♠" });


`returns`The asset data.

`since`v3000.0



[loadShader](#loadShader)(name: string | null, vert?: string | null, frag?: string | null): Asset<ShaderData\>
==============================================================================================================

Load a shader with vertex and fragment code.

`param`name\- The asset name.

`param`vert\- The vertex shader code. Null if not needed.

`param`frag\- The fragment shader code. Null if not needed.

    // default shaders and custom shader format
    loadShader("outline",
    `vec4 vert(vec2 pos, vec2 uv, vec4 color) {
        // predefined functions to get the default value by KAPLAY
        return def_vert();
    }`,
    `vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        // turn everything blue-ish
        return def_frag() * vec4(0, 0, 1, 1);
    }`, false)


`returns`The asset data.

`since`v2000.0



[loadShaderURL](#loadShaderURL)(name: string | null, vert?: string | null, frag?: string | null): Asset<ShaderData\>
====================================================================================================================

Load a shader with vertex and fragment code file url.

`param`name\- The name of the asset.

`param`vert\- The vertex shader code. Null if not needed.

`param`frag\- The fragment shader code. Null if not needed.

    // load only a fragment shader from URL
    loadShaderURL("outline", null, "/shaders/outline.glsl")


`retunrs`The asset data.

`since`v3000.0



[load](#load)<T\>(l: Promise): Asset<T\>
========================================

Add a new loader to wait for before starting the game.

`param`l\- The loader to wait for.

    load(new Promise((resolve, reject) => {
        // anything you want to do that stalls the game in loading state
        resolve("ok")
    }))


`returns`The asset data.

`since`v3000.0



[loadProgress](#loadProgress)(): number
=======================================

Get the global asset loading progress (0.0 - 1.0).

`returns`The loading progress.

`since`v3000.0



[getSprite](#getSprite)(name: string): Asset | null
===================================================

Get SpriteData from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[getSound](#getSound)(name: string): Asset | null
=================================================

Get SoundData from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[getFont](#getFont)(name: string): Asset | null
===============================================

Get FontData from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[getBitmapFont](#getBitmapFont)(name: string): Asset | null
===========================================================

Get BitmapFontData from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[getShader](#getShader)(name: string): Asset | null
===================================================

Get ShaderData from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[getAsset](#getAsset)(name: string): Asset | null
=================================================

Get custom data from name.

`param`name\- The asset name.

`returns`The asset data.

`since`v3000.0



[Asset](#Asset)<D\>:
====================

An asset is a resource that is loaded asynchronously. It can be a sprite, a sound, a font, a shader, etc.

[loaded](#Asset-loaded): boolean
================================

[loaded](#Asset-loaded)<D\>(data: D): Asset<D\>
===============================================

[data](#Asset-data): D | null
=============================

[error](#Asset-error): Error | null
===================================

[onLoadEvents](#Asset-onLoadEvents):
====================================

[onErrorEvents](#Asset-onErrorEvents):
======================================

[onFinishEvents](#Asset-onFinishEvents):
========================================

[onLoad](#Asset-onLoad)(action: (data: D)\=>void): this
=======================================================

[onError](#Asset-onError)(action: (err: Error)\=>void): this
============================================================

[onFinish](#Asset-onFinish)(action: ()\=>void): this
====================================================

[then](#Asset-then)(action: (data: D)\=>void): Asset<D\>
========================================================

[catch](#Asset-catch)(action: (err: Error)\=>void): Asset<D\>
=============================================================

[finally](#Asset-finally)(action: ()\=>void): Asset<D\>
=======================================================



[SpriteData](#SpriteData):
==========================

[tex](#SpriteData-tex): Texture
===============================

[frames](#SpriteData-frames): Quad\[\]
======================================

[anims](#SpriteData-anims): SpriteAnims
=======================================

[slice9](#SpriteData-slice9): NineSlice | null
==============================================

[packerId](#SpriteData-packerId): number | null
===============================================

[width](#SpriteData-width)(): number
====================================

`since`v3001.0

[height](#SpriteData-height)(): number
======================================

[from](#SpriteData-from)(src: LoadSpriteSrc, opt?: LoadSpriteOpt): Promise<SpriteData\>
=======================================================================================

[fromImage](#SpriteData-fromImage)(data: ImageSource, opt?: LoadSpriteOpt): SpriteData
======================================================================================

[fromURL](#SpriteData-fromURL)(url: string, opt?: LoadSpriteOpt): Promise<SpriteData\>
======================================================================================



[SoundData](#SoundData):
========================

[buf](#SoundData-buf): AudioBuffer
==================================

[fromAudioBuffer](#SoundData-fromAudioBuffer)(buf: AudioBuffer): SoundData
==========================================================================

[fromArrayBuffer](#SoundData-fromArrayBuffer)(buf: ArrayBuffer): Promise<SoundData\>
====================================================================================

[fromURL](#SoundData-fromURL)(url: string): Promise<SoundData\>
===============================================================



[add](#add)<T\>(comps?: CompList | GameObj): GameObj<T\>
========================================================

Assemble a game object from a list of components, and add it to the game,

`param`comps\- List of components to add to the game object, or a game object made with

    const player = add([
        // List of components, each offers a set of functionalities
        sprite("mark"),
        pos(100, 200),
        area(),
        body(),
        health(8),
        // Plain strings are tags, a quicker way to let us define behaviors for a group
        "player",
        "friendly",
        // Components are just plain objects, you can pass an object literal as a component.
        {
            dir: LEFT,
            dead: false,
            speed: 240,
        },
    ]);

    // .jump is provided by body()
    player.jump();

    // .moveTo is provided by pos()
    player.moveTo(300, 200);

    // .onUpdate() is on every game object, it registers an event that runs every frame
    player.onUpdate(() => {
        // .move() is provided by pos()
        player.move(player.dir.scale(player.speed));
    });

    // .onCollide is provided by area()
    player.onCollide("tree", () => {
        destroy(player);
    });


`returns`The added game object that contains all properties and methods each component offers.



[make](#make)<T\>(comps?: CompList): GameObj<T\>
================================================

Create a game object like add(), but not adding to the scene.

`param`comps\- List of components to add to the game object.

    const label = make([
        rect(100, 20),
    ]);

    // Add a new text to the label
    label.add([
        text("Hello, world!"),
    ]);

    // Add game object to the scene
    // Now it will render
    add(label);


`returns`The created game object that contains all properties and methods each component offers.

`since`v3000.1



[readd](#readd)(obj: GameObj): GameObj
======================================

Remove and re-add the game obj, without triggering add / destroy events.

`param`obj\- The game object to re-add.

    // Common way to use this is to have one sprite overlap another sprite, and use readd() to have the bottom sprite on top of the other.

    // Create two sprites.
    const greenBean = add([
        sprite("bean"),
        pos(200,140),
        color(255, 255, 255),
        area(),
    ]);

    // This bean will overlap the green bean.
    const purpleBean = add([
        sprite("bean"),
        pos(230,140),
        color(255, 0, 255),
        area(),
    ]);

    // Example 1: simply call readd() on the target you want on top.
    readd(greenBean);

    // Example 2: using onClick() or other functions with readd().
    // If you comment out the first example, and use this readd() with a function like onClick(), you
    can keep switching which sprite is above the other ( click on edge of face ).

    purpleBean.onClick(() => {
        readd(greenBean);
    });

    greenBean.onClick(() => {
        readd(purpleBean);
    });


`returns`The re-added game object.

`since`v3001.0



[get](#get)<T\>(tag: Tag | Tag\[\], opts?: GetOpt): GameObj\[\]
===============================================================

Get a list of all game objs with certain tag.

`param`tag\- The tag to search for. Use "\*" to get all objects.

`param`opts\- Additional options.

    // get a list of all game objs with tag "bomb"
    const allBombs = get("bomb");

    // To get all objects use "*"
    const allObjs = get("*");

    // Recursively get all children and descendents
    const allObjs = get("*", { recursive: true });
    ```

    // Get a live query which updates in real-time
    const allObjs = get("*", { liveUpdate: true });


`returns`A list of game objects that have the tag.

`since`v2000.0



[query](#query)(opt: QueryOpt): GameObj\[\]
===========================================

Get a list of game objects in an advanced way.

`param`opt\- The query options.

    const bean = k.add(["friend", "bean"]);
    const bean2 = k.add(["friend", "bean"]);
    const bag = k.add(["friend", "bag"]);

    // get bean
    query({
        include: "bean",
    }) // will return [bean, bean2];

    // get all friends excluding bean
    query({
        include: "friend",
        exclude: "bean",
    }); // will return [bag]

    // get all visible friends
    query({
        include: "friend",
        visible: true,
    });

    // get all friends less than 150 pixels from bean
    bean.query({
        include: "friend",
        distance: 150,
    });





[destroy](#destroy)(obj: GameObj): void
=======================================

Remove the game obj.

`param`obj\- The game object to remove.

    // every time bean collides with anything with tag "fruit", remove it
    bean.onCollide("fruit", (fruit) => {
        destroy(fruit);
    });




[destroyAll](#destroyAll)(tag: Tag): void
=========================================

Remove all game objs with certain tag.

`param`tag\- The tag to search for.

    // destroy all objects with tag "bomb" when you click one
    onClick("bomb", () => {
        destroyAll("bomb");
    });




[KeepFlags](#KeepFlags):
========================

[Pos](#KeepFlags-Pos):
======================

[Angle](#KeepFlags-Angle):
==========================

[Scale](#KeepFlags-Scale):
==========================

[All](#KeepFlags-All):
======================



[GameObjRaw](#GameObjRaw):
==========================

Base interface of all game objects.

`since`v2000.0

[add](#GameObjRaw-add)<T\>(comps?: CompList | GameObj): GameObj<T\>
===================================================================

Add a child.

`param`comps\- The components to add.

`returns`The added game object.

`since`v3000.0

[readd](#GameObjRaw-readd)<T\>(obj: GameObj): GameObj<T\>
=========================================================

Remove and re-add the game obj, without triggering add / destroy events.

`param`obj\- The game object to re-add.

`returns`The re-added game object.

`since`v3000.0

[remove](#GameObjRaw-remove)(obj: GameObj): void
================================================

Remove a child.

`param`obj\- The game object to remove.

`since`v3000.0

[removeAll](#GameObjRaw-removeAll)(tag: Tag): void
==================================================

Remove all children with a certain tag.

`param`tag\- The tag to remove.

`since`v3000.0

[removeAll](#GameObjRaw-removeAll)(): void
==========================================

Remove all children.

`since`v3000.0

[get](#GameObjRaw-get)<T\>(tag: Tag | Tag\[\], opts?: GetOpt): GameObj\[\]
==========================================================================

Get a list of all game objs with certain tag.

`param`tag\- The tag to get.

`since`v3000.0

[query](#GameObjRaw-query)(opt: QueryOpt): GameObj\[\]
======================================================

Get a list of all game objs with certain properties.

`param`opt\- The properties to get.

`since`v3001.0

[setParent](#GameObjRaw-setParent)(p: GameObj, opt: SetParentOpt): void
=======================================================================

Set the parent game obj.

`since`v4000.0

[children](#GameObjRaw-children): GameObj\[\]
=============================================

`readonly`Get all children game objects.

`since`v3000.0

[tags](#GameObjRaw-tags): string\[\]
====================================

`readonly`Get the tags of a game object. For update it, use \`tag()\` and \`untag()\`.

`since`v3001.0

[fixedUpdate](#GameObjRaw-fixedUpdate)(): void
==============================================

Update this game object and all children game objects.

`since`v3001.0

[update](#GameObjRaw-update)(): void
====================================

Update this game object and all children game objects.

`since`v3000.0

[draw](#GameObjRaw-draw)(): void
================================

Draw this game object and all children game objects.

`since`v3000.0

[drawInspect](#GameObjRaw-drawInspect)(): void
==============================================

Draw debug info in inspect mode

`since`v3000.0

[clearEvents](#GameObjRaw-clearEvents)(): void
==============================================

[use](#GameObjRaw-use)(comp: Comp | Tag): void
==============================================

Add a component.

    const obj = add([
       sprite("bean"),
    ]);

    // Add opacity
    obj.use(opacity(0.5));


`since`v2000.0

[unuse](#GameObjRaw-unuse)(comp: Tag): void
===========================================

Remove a component with its id (the component name)

`param`comp\- The component id to remove. It means the name, if sprite, then it's "sprite".

    // Remove sprite component
    obj.unuse("sprite");


`since`v2000.0

[has](#GameObjRaw-has)(compId: string | string\[\], op?: and | or): boolean
===========================================================================

Check if game object has a certain component.

`param`compId\- The component id(s) to check.

`param`op\- The operator to use when searching for multiple components. Default is "and".

    // Check if game object has sprite component
    if(obj.has("sprite")) {
        debug.log("has sprite component");
    }

    // Check if game object has tags
    obj.has(["tag1", "tag2"]); // AND, it has both tags
    obj.has(["tag1", "tag2"], "or"); // OR, it has either tag1 or tag2


`returns`true if has the component(s), false otherwise.

`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0

[tag](#GameObjRaw-tag)(tag: Tag | Tag\[\]): void
================================================

Add a tag(s) to the game obj.

`param`tag\- The tag(s) to add.

    // add enemy tag
    obj.tag("enemy");

    // add multiple tags
    obj.tag(["enemy", "boss"]);


`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0

[untag](#GameObjRaw-untag)(tag: Tag | Tag\[\]): void
====================================================

Remove a tag(s) from the game obj.

`param`tag\- The tag(s) to remove.

    // remove enemy tag
    obj.untag("enemy");

    // remove multiple tags
    obj.untag(["enemy", "boss"]);


`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0

[is](#GameObjRaw-is)(tag: Tag | Tag\[\], op?: and | or): boolean
================================================================

If there's certain tag(s) on the game obj.

`param`tag\- The tag(s) for checking.

`param`op\- The operator to use when searching for multiple tags. Default is "and".

`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0

[on](#GameObjRaw-on)(event: GameObjEventNames | string & , action: (args: any)\=>void): KEventController
========================================================================================================

Register an event.

`param`event\- The event name.

`param`action\- The action to run when event is triggered.

`returns`The event controller.

`since`v2000.0

[trigger](#GameObjRaw-trigger)(event: string, args: any): void
==============================================================

Trigger an event.

`param`event\- The event name.

`parm`args - The arguments to pass to the event action.

`since`v2000.0

[destroy](#GameObjRaw-destroy)(): void
======================================

Remove the game obj from scene.

`since`v2000.0

[c](#GameObjRaw-c)(id: string): Comp | null
===========================================

Get state for a specific comp.

`param`id\- The component id.

`since`v2000.0

[inspect](#GameObjRaw-inspect)(): GameObjInspect
================================================

Gather debug info of all comps.

`since`v2000.0

[onAdd](#GameObjRaw-onAdd)(action: ()\=>void): KEventController
===============================================================

Register an event that runs when the game obj is added to the scene.

`returns`The event controller.

`since`v2000.0

[onUpdate](#GameObjRaw-onUpdate)(action: ()\=>void): KEventController
=====================================================================

Register an event that runs every frame as long as the game obj exists.

`returns`The event controller.

`since`v2000.1

[onDraw](#GameObjRaw-onDraw)(action: ()\=>void): KEventController
=================================================================

Register an event that runs every frame as long as the game obj exists (this is the same as \`onUpdate()\`, but all draw events are run after all update events).

`returns`The event controller.

`since`v2000.1

[onDestroy](#GameObjRaw-onDestroy)(action: ()\=>void): KEventController
=======================================================================

Register an event that runs when the game obj is destroyed.

`returns`The event controller.

`since`v2000.1

[onCompAdd](#GameObjRaw-onCompAdd)(action: (id: string)\=>void): KEventController
=================================================================================

Register an event that runs when a component is used.

`returns`The event controller.

`since`v4000.0

[onCompDestroy](#GameObjRaw-onCompDestroy)(action: (id: string)\=>void): KEventController
=========================================================================================

Register an event that runs when a component is unused.

`returns`The event controller.

`since`v4000.0

[exists](#GameObjRaw-exists)(): boolean
=======================================

If game obj is attached to the scene graph.

`returns`true if attached, false otherwise.

`since`v2000.0

[isAncestorOf](#GameObjRaw-isAncestorOf)(obj: GameObj): boolean
===============================================================

Check if is an ancestor (recursive parent) of another game object

`returns`true if is ancestor, false otherwise.

`since`v3000.0

[transform](#GameObjRaw-transform): Mat23
=========================================

Calculated transform matrix of a game object.

`since`v3000.0

[hidden](#GameObjRaw-hidden): boolean
=====================================

If draw the game obj (run "draw" event or not).

`since`v2000.0

[paused](#GameObjRaw-paused): boolean
=====================================

If update the game obj (run "update" event or not).

`since`v2000.0

[id](#GameObjRaw-id): GameObjID | null
======================================

A unique number ID for each game object.

`since`v2000.0

[canvas](#GameObjRaw-canvas): FrameBuffer | null
================================================

The canvas to draw this game object on

`since`v3001.0

[onKeyDown](#GameObjRaw-onKeyDown): KAPLAYCtx\[onKeyDown\]
==========================================================

[onKeyPress](#GameObjRaw-onKeyPress): KAPLAYCtx\[onKeyPress\]
=============================================================

[onKeyPressRepeat](#GameObjRaw-onKeyPressRepeat): KAPLAYCtx\[onKeyPressRepeat\]
===============================================================================

[onKeyRelease](#GameObjRaw-onKeyRelease): KAPLAYCtx\[onKeyRelease\]
===================================================================

[onCharInput](#GameObjRaw-onCharInput): KAPLAYCtx\[onCharInput\]
================================================================

[onMouseDown](#GameObjRaw-onMouseDown): KAPLAYCtx\[onMouseDown\]
================================================================

[onMousePress](#GameObjRaw-onMousePress): KAPLAYCtx\[onMousePress\]
===================================================================

[onMouseRelease](#GameObjRaw-onMouseRelease): KAPLAYCtx\[onMouseRelease\]
=========================================================================

[onMouseMove](#GameObjRaw-onMouseMove): KAPLAYCtx\[onMouseMove\]
================================================================

[onTouchStart](#GameObjRaw-onTouchStart): KAPLAYCtx\[onTouchStart\]
===================================================================

[onTouchMove](#GameObjRaw-onTouchMove): KAPLAYCtx\[onTouchMove\]
================================================================

[onTouchEnd](#GameObjRaw-onTouchEnd): KAPLAYCtx\[onTouchEnd\]
=============================================================

[onScroll](#GameObjRaw-onScroll): KAPLAYCtx\[onScroll\]
=======================================================

[onGamepadButtonDown](#GameObjRaw-onGamepadButtonDown): KAPLAYCtx\[onGamepadButtonDown\]
========================================================================================

[onGamepadButtonPress](#GameObjRaw-onGamepadButtonPress): KAPLAYCtx\[onGamepadButtonPress\]
===========================================================================================

[onGamepadButtonRelease](#GameObjRaw-onGamepadButtonRelease): KAPLAYCtx\[onGamepadButtonRelease\]
=================================================================================================

[onGamepadStick](#GameObjRaw-onGamepadStick): KAPLAYCtx\[onGamepadStick\]
=========================================================================

[onButtonDown](#GameObjRaw-onButtonDown): KAPLAYCtx\[onButtonDown\]
===================================================================

[onButtonPress](#GameObjRaw-onButtonPress): KAPLAYCtx\[onButtonPress\]
======================================================================

[onButtonRelease](#GameObjRaw-onButtonRelease): KAPLAYCtx\[onButtonRelease\]
============================================================================



[GameObj](#GameObj)<T\>: GameObjRaw & MergeComps
================================================

The basic unit of object in KAPLAY. The player, a butterfly, a tree, or even a piece of text.



[GameObjID](#GameObjID): number
===============================



[pos](#pos)(x: number, y: number): PosComp
==========================================

Set the position of a Game Object.

`param`x\- The x position to set.

`param`y\- The y position to set.

    // This game object will draw a "bean" sprite at (100, 200)
    add([
        pos(100, 200),
        sprite("bean"),
    ]);


`returns`The position comp.

`since`v2000.0



[pos](#pos)(xy: number): PosComp
================================



[pos](#pos)(p: Vec2): PosComp
=============================



[pos](#pos)(): PosComp
======================



[scale](#scale)(x: number, y: number): ScaleComp
================================================

Set the scale of a Game Object.

`param`x\- The x scale to set.

`param`y\- The y scale to set.

    // scale uniformly with one value
    add([
        sprite("bean"),
    	   scale(3),
    ]);

    // scale with x & y values. In this case, scales more horizontally.
    add([
        sprite("bean"),
    	   scale(3, 1),
    ]);

     // scale with vec2(x,y).
    bean.scale = vec2(2,4);



`returns`The scale comp.

`since`v2000.0



[scale](#scale)(xy: number): ScaleComp
======================================



[scale](#scale)(s: Vec2): ScaleComp
===================================



[scale](#scale)(): ScaleComp
============================



[rotate](#rotate)(a?: number): RotateComp
=========================================

Rotates a Game Object (in degrees).

`param`a\- The angle to rotate by. Defaults to 0.

    let bean = add([
        sprite("bean"),
        rotate(),
    ])

    // bean will be upside down!
    bean.angle = 180


`returns`The rotate comp.

`since`v2000.0



[color](#color)(r: number, g: number, b: number): ColorComp
===========================================================

Sets the color of a Game Object (rgb 0-255).

`param`r\- The red value to set.

`param`g\- The green value to set.

`param`b\- The blue value to set.

    // blue frog
    add([
        sprite("bean"),
        color(0, 0, 255),
    ]);


`returns`The color comp.

`since`v2000.0



[color](#color)(c: Color): ColorComp
====================================



[color](#color)(rgb: \[number, number, number\]): ColorComp
===========================================================



[color](#color)(c: string): ColorComp
=====================================



[color](#color)(): ColorComp
============================



[opacity](#opacity)(o?: number): OpacityComp
============================================

Sets the opacity of a Game Object (0.0 - 1.0).

`param`o\- The opacity value to set.

    const bean = add([
        sprite("bean"),
        opacity(0.5) // Make bean 50% transparent
    ])

    // Make bean invisible
    bean.opacity = 0

    // Make bean fully visible
    bean.opacity = 1


`returns`The opacity comp.

`since`v2000.0



[sprite](#sprite)(spr: string | SpriteData | Asset, opt?: SpriteCompOpt): SpriteComp
====================================================================================

Attach and render a sprite to a Game Object.

`param`spr\- The sprite to render.

`param`opt\- Options for the sprite component. See

    // minimal setup
    add([
        sprite("bean"),
    ])

    // with options
    const bean = add([
        sprite("bean", {
            // start with animation "idle"
            anim: "idle",
        }),
    ])

    // play / stop an anim
    bean.play("jump")
    bean.stop()

    // manually setting a frame
    bean.frame = 3


`returns`The sprite comp.

`since`v2000.0



[text](#text)(txt?: string, opt?: TextCompOpt): TextComp
========================================================

Attach and render a text to a Game Object.

`param`txt\- The text to display.

`param`opt\- Options for the text component. See

    // a simple score counter
    const score = add([
        text("Score: 0"),
        pos(24, 24),
        { value: 0 },
    ])

    player.onCollide("coin", () => {
        score.value += 1
        score.text = "Score:" + score.value
    })

    // with options
    add([
        pos(24, 24),
        text("ohhi", {
            size: 48, // 48 pixels tall
            width: 320, // it'll wrap to next line when width exceeds this value
            font: "sans-serif", // specify any font you loaded or browser built-in
        }),
    ])


`returns`The text comp.

`since`v2000.0



[polygon](#polygon)(pts: Vec2\[\], opt?: PolygonCompOpt): PolygonComp
=====================================================================

Attach and render a polygon to a Game Object.

`param`pts\- The points to render the polygon.

`param`opt\- Options for the polygon component. See

    // Make a square the hard way
    add([
        pos(80, 120),
        polygon([vec2(0,0), vec2(50,0), vec2(50,50), vec2(0,50)]),
        outline(4),
        area(),
    ])


`returns`The polygon comp.

`since`v3001.0



[rect](#rect)(w: number, h: number, opt?: RectCompOpt): RectComp
================================================================

Attach and render a rectangle to a Game Object.

`param`w\- The width of the rectangle.

`param`h\- The height of the rectangle.

`param`opt\- Options for the rectangle component. See

    const obstacle = add([
        pos(80, 120),
        rect(20, 40),
        outline(4),
        area(),
    ])


`returns`The rectangle component.



[circle](#circle)(radius: number, opt?: CircleCompOpt): CircleComp
==================================================================

Attach and render a circle to a Game Object.

`param`radius\- The radius of the circle.

`param`opt\- Options for the circle component. See

    add([
        pos(80, 120),
        circle(16),
    ])


`returns`The circle comp.

`since`v2000.0



[ellipse](#ellipse)(radiusX: number, radiusY: number): EllipseComp
==================================================================

Attach and render an ellipse to a Game Object.

`param`radiusX\- The radius of the ellipse on the x-axis.

`param`radiusY\- The radius of the ellipse on the y-axis.

    add([
        pos(80, 120),
        ellipse(16, 8),
    ])


`returns`The ellipse comp.

`since`v2000.0



[uvquad](#uvquad)(w: number, h: number): UVQuadComp
===================================================

Attach and render a UV quad to a Game Object.

`param`w\- The width of the quad.

`param`h\- The height of the quad.

    add([
        uvquad(width(), height()),
        shader("spiral"),
    ])


`returns`The UV quad comp.

`since`v2000.0



[area](#area)(opt?: AreaCompOpt): AreaComp
==========================================

Attach a collider area from shape and enables collision detection in a Game Object.

`param`opt\- Options for the area component. See

    // Automatically generate area information from the shape of render
    const player = add([
        sprite("bean"),
        area(),
    ])

    // Die if player collides with another game obj with tag "tree"
    player.onCollide("tree", () => {
        destroy(player)
        go("lose")
    })

    // Check for collision manually every frame instead of registering an event
    player.onUpdate(() => {
        if (player.isColliding(bomb)) {
            score += 1
        }
    })


`returns`The area comp.

`since`v2000.0



[anchor](#anchor)(o: Anchor | Vec2): AnchorComp
===============================================

Anchor point for render (default "topleft").

`param`o\- The anchor point to set.

    // set anchor to "center" so it'll rotate from center
    add([
        rect(40, 10),
        rotate(45),
        anchor("center"),
    ])


`returns`The anchor comp.

`since`v2000.0



[z](#z)(z: number): ZComp
=========================

Determines the draw order for objects on the same layer. Object will be drawn on top if z value is bigger.

`param`z\- The z value to set.

    const bean = add([
       sprite("bean"),
       pos(100, 100),
       z(10), // Bean has a z value of 10
    ])

    // Mark has a z value of 20, so he will always be drawn on top of bean
    const mark = add([
      sprite("mark"),
      pos(100, 100),
      z(20),
    ])

    bean.z = 30 // Bean now has a higher z value, so it will be drawn on top of mark


`returns`The z comp.

`since`v2000.0



[outline](#outline)(width?: number, color?: Color, opacity?: number, join?: LineJoin, miterLimit?: number, cap?: LineCap): OutlineComp
======================================================================================================================================

Give an object an outline. Doesn't support sprite or text components.

`param`width\- The width of the outline.

`param`color\- The color of the outline.

`param`opacity\- The opacity of the outline.

`param`join\- -The line join style.

`param`miterLimit\- The miter limit ratio.

`param`cap\-The line cap style.

    // Add an outline to a rectangle

    add([
       rect(40, 40),
       outline(4),
    ]);


`returns`The outline comp.

`since`v2000.0



[particles](#particles)(popt: ParticlesOpt, eopt: EmitterOpt): ParticlesComp
============================================================================

Attach a particle emitter to a Game Object.

`param`popt\- The options for the particles.

`param`eopt\- The options for the emitter.

    // beansplosion

    // create the emitter
    const emitter = add([
        pos(center()),
        particles({
            max: 100,
            speed: [75, 100],
            lifeTime: [0.75,1.0],
            angle: [0, 360],
            opacities: [1.0, 0.0],
            texture: getSprite("bean").tex,   // texture of a sprite
            quads: getSprite("bean").frames,  // frames of a sprite
        }, {
            direction: 0,
            spread: 360,
        }),
    ])

    onUpdate(() => {
        emitter.emit(1)
    })


`returns`The particles comp.

`since`v3001.0



[body](#body)(opt?: BodyCompOpt): BodyComp
==========================================

Physical body that responds to gravity. Requires "area" and "pos" comp. This also makes the object "solid".

`param`opt\- Options for the body component. See

    // bean jumpy
    const bean = add([
        sprite("bean"),
        // body() requires "pos" and "area" component
        pos(),
        area(),
        body(),
    ])

    // when bean is grounded, press space to jump
    // check out #BodyComp for more methods
    onKeyPress("space", () => {
        if (bean.isGrounded()) {
            bean.jump()
        }
    })

    // run something when bean falls and hits a ground
    bean.onGround(() => {
        debug.log("oh no!")
    })


`returns`The body comp.

`since`v2000.0



[surfaceEffector](#surfaceEffector)(opt: SurfaceEffectorCompOpt): SurfaceEffectorComp
=====================================================================================

Applies a force on a colliding object in order to make it move along the collision tangent vector. Good for conveyor belts.

`param`opt\- Options for the surface effector component. See

    loadSprite("belt", "/sprites/jumpy.png")

    // conveyor belt
    add([
        pos(center()),
        sprite("belt"),
        rotate(90),
        area(),
        body({ isStatic: true }),
        surfaceEffector({
            speed: 50,
        })
    ])


`returns`The surface effector comp.

`since`v3001.0



[areaEffector](#areaEffector)(opt: AreaEffectorCompOpt): AreaEffectorComp
=========================================================================

Applies a force on a colliding object. Good to apply anti-gravity, wind or water flow.

`param`opt\- Options for the area effector component. See

`returns`The area effector comp.

`since`v3001.0



[pointEffector](#pointEffector)(opt: PointEffectorCompOpt): PointEffectorComp
=============================================================================

Applies a force on a colliding object directed towards this object's origin. Good to apply magnetic attraction or repulsion.

`param`opt\- Options for the point effector component. See

`returns`The point effector comp.

`since`v3001.0



[platformEffector](#platformEffector)(opt?: PlatformEffectorCompOpt): PlatformEffectorComp
==========================================================================================

The platform effector makes it easier to implement one way platforms or walls. This effector is typically used with a static body, and it will only be solid depending on the direction the object is traveling from.

`param`opt\- Options for the platform effector component. See

`returns`The platform effector comp.

`since`v3001.0



[buoyancyEffector](#buoyancyEffector)(opt: BuoyancyEffectorCompOpt): BuoyancyEffectorComp
=========================================================================================

Applies an upwards force (force against gravity) to colliding objects depending on the fluid density and submerged area. Good to apply constant thrust.

`param`opt\- Options for the buoyancy effector component. See

`returns`The buoyancy effector comp.

`since`v3001.0



[constantForce](#constantForce)(opt: ConstantForceCompOpt): ConstantForceComp
=============================================================================

Applies a constant force to the object. Good to apply constant thrust.

`param`opt\- Options for the constant force component. See

`returns`The constant force comp.

`since`v3001.0



[doubleJump](#doubleJump)(numJumps?: number): DoubleJumpComp
============================================================

Enables double jump.

`param`numJumps\- The number of jumps allowed. Defaults to 1.

`requires`

`returns`The double jump comp.

`since`v3000.0



[move](#move)(dir: number | Vec2, speed: number): EmptyComp
===========================================================

Move towards a direction infinitely, and destroys when it leaves game view.

`param`dir\- The direction to move towards.

`param`speed\- The speed to move at.

`requires`

    // enemy throwing feces at player
    const projectile = add([
        sprite("feces"),
        pos(enemy.pos),
        area(),
        move(player.pos.angle(enemy.pos), 1200),
        offscreen({ destroy: true }),
    ])


`returns`The move comp.

`since`v2000.0



[offscreen](#offscreen)(opt?: OffScreenCompOpt): OffScreenComp
==============================================================

Control the behavior of object when it goes out of view.

`param`opt\- Options for the offscreen component. See

    add([
        pos(player.pos),
        sprite("bullet"),
        offscreen({ destroy: true }),
        "projectile",
    ]);


`returns`The offscreen comp.

`since`v2000.2



[follow](#follow)(obj: GameObj | null, offset?: Vec2): FollowComp
=================================================================

Follow another game obj's position.

`param`obj\- The game obj to follow.

`param`offset\- The offset to follow at.

    const bean = add(...)

    add([
        sprite("bag"),
        pos(),
        follow(bean) // Follow bean's position
    ]);

    // Using offset
    const target = add(...)

    const mark = add([
      sprite("mark"),
      pos(),
      follow(target, vec2(32, 32)) // Follow target's position with an offset
    ])

    mark.follow.offset = vec2(64, 64) // Change the offset


`returns`The follow comp.

`since`v2000.0



[shader](#shader)(id: string, uniform?: Uniform | ()\=>Uniform): ShaderComp
===========================================================================

Custom shader to manipulate sprite.

`param`id\- The shader id.

`param`uniform\- The uniform to pass to the shader.

`returns`The shader comp.

`since`v2000.0



[textInput](#textInput)(hasFocus?: boolean, maxInputLength?: number): TextInputComp
===================================================================================

Get input from the user and store it in the nodes text property, displaying it with the text component and allowing other functions to access it.

`param`hasFocus\- Whether the text input should have focus.

`param`maxInputLength\- The maximum length of the input.

    const obj = add([
        text(""),
        textInput(),
    ])

    obj.hasFocus = false
    debug.log(obj.text) // oh no i cant see my new text since it was disabled


`returns`The text input comp.

`since`v3001.0



[timer](#timer)(maxLoopsPerFrame?: number): TimerComp
=====================================================

Enable timer related functions like wait(), loop(), tween() on the game object.

`param`maxLoopsPerFrame\- The maximum number of loops per frame.

    const obj = add([
        timer(),
    ])

    obj.wait(2, () => { ... })
    obj.loop(0.5, () => { ... })
    obj.tween(obj.pos, mousePos(), 0.5, (p) => obj.pos = p, easings.easeOutElastic)


`returns`The timer comp.

`since`v2000.0



[fixed](#fixed)(): FixedComp
============================

Make a game obj unaffected by camera or parent object transforms, and render at last. Useful for UI elements.

    // this will be be fixed on top left and not affected by camera
    const score = add([
        text(0),
        pos(12, 12),
        fixed(),
    ])


`returns`The fixed comp.

`since`v2000.0



[stay](#stay)(scenesToStay?: string\[\]): StayComp
==================================================

Don't get destroyed on scene switch. Only works in objects attached to root.

`param`scenesToStay\- The scenes to stay in. By default it stays in all scenes.

    player.onCollide("bomb", () => {
        // spawn an explosion and switch scene, but don't destroy the explosion game obj on scene switch
        add([
            sprite("explosion", { anim: "burst", }),
            stay(),
            lifespan(1),
        ])
        go("lose", score)
    })


`returns`The stay comp.

`since`v2000.0



[health](#health)(hp: number, maxHP?: number): HealthComp
=========================================================

Handles health related logic and events.

`param`hp\- The initial health points.

`param`maxHP\- The maximum health points.

    const player = add([
        health(3),
    ])

    player.onCollide("bad", (bad) => {
        player.hurt(1)
        bad.hurt(1)
    })

    player.onCollide("apple", () => {
        player.heal(1)
    })

    player.on("hurt", () => {
        play("ouch")
    })

    // triggers when hp reaches 0
    player.on("death", () => {
        destroy(player)
        go("lose")
    })


`returns`The health comp.

`since`v2000.0



[lifespan](#lifespan)(time: number, options?: LifespanCompOpt): EmptyComp
=========================================================================

Destroy the game obj after certain amount of time

`param`time\- The time to live.

`param`options\- Options for the lifespan component. See

    // spawn an explosion, destroy after 1 seconds, start fading away after 0.5 second
    add([
        sprite("explosion", { anim: "burst", }),
        lifespan(1, { fade: 0.5 }),
    ])


`returns`The lifespan comp.

`since`v2000.0



[named](#named)(name: string): NamedComp
========================================

Names an game obj.

`param`name\- The name to set.

`returns`The named comp.

`since`v3001.0



[state](#state)(initialState: string, stateList?: string\[\]): StateComp
========================================================================

Finite state machine.

`param`initialState\- The initial state.

`param`stateList\- The list of states.

    const enemy = add([
        pos(80, 100),
        sprite("robot"),
        state("idle", ["idle", "attack", "move"]),
    ])

    // this callback will run once when enters "attack" state
    enemy.onStateEnter("attack", () => {
        // enter "idle" state when the attack animation ends
        enemy.play("attackAnim", {
            // any additional arguments will be passed into the onStateEnter() callback
            onEnd: () => enemy.enterState("idle", rand(1, 3)),
        })
        checkHit(enemy, player)
    })

    // this will run once when enters "idle" state
    enemy.onStateEnter("idle", (time) => {
        enemy.play("idleAnim")
        wait(time, () => enemy.enterState("move"))
    })

    // this will run every frame when current state is "move"
    enemy.onStateUpdate("move", () => {
        enemy.follow(player)
        if (enemy.pos.dist(player.pos) < 16) {
            enemy.enterState("attack")
        }
    })


`returns`The state comp.

`since`v2000.1



[state](#state)(initialState: string, stateList: string\[\], transitions: Record): StateComp
============================================================================================

state() with pre-defined transitions.

`param`initialState\- The initial state.

`param`stateList\- The list of states.

`param`transitions\- The transitions between states.

    const enemy = add([
        pos(80, 100),
        sprite("robot"),
        state("idle", ["idle", "attack", "move"], {
            "idle": "attack",
            "attack": "move",
            "move": [ "idle", "attack" ],
        }),
    ])

    // this callback will only run once when enter "attack" state from "idle"
    enemy.onStateTransition("idle", "attack", () => {
        checkHit(enemy, player)
    })


`returns`The state comp.

`since`v2000.2



[fadeIn](#fadeIn)(time: number): Comp
=====================================

`deprecated`since v3001.0

`requires`

`returns`An empty comp.

`since`v3000.0



[mask](#mask)(maskType?: Mask): MaskComp
========================================

Mask all children object render.

`param`maskType\- The type of mask to use.

`returns`The mask comp.

`since`v3001.0



[drawon](#drawon)(canvas: FrameBuffer): Comp
============================================

Specifies the FrameBuffer the object should be drawn on.

`param`canvas\- The FrameBuffer to draw on.

    // Draw on another canvas
    let canvas = makeCanvas(width(), height());

    let beanOnCanvas = add([
        sprite("bean"),
        drawon(canvas.fb),
    ]);


`returns`The drawon comp.

`since`v3000.0



[tile](#tile)(opt?: TileCompOpt): TileComp
==========================================

A tile on a tile map.

`param`opt\- Options for the tile component. See

`returns`The tile comp.

`since`v3000.0



[agent](#agent)(opt?: AgentCompOpt): AgentComp
==============================================

An agent which can finds it way on a tilemap.

`param`opt\- Options for the agent component. See

`returns`The agent comp.

`since`v3000.0



[animate](#animate)(opt?: AnimateCompOpt): AnimateComp
======================================================

A component to animate properties.

`param`opt\- Options for the animate component. See

    let movingBean = add([
          sprite("bean"),
          pos(50, 150),
          anchor("center"),
          animate(),
    ]);

    // Moving right to left using ping-pong
    movingBean.animate("pos", [vec2(50, 150), vec2(150, 150)], {
        duration: 2,
        direction: "ping-pong",
    });


`returns`The animate comp.

`since`v3001.0



[fakeMouse](#fakeMouse)(opt?: FakeMouseOpt): FakeMouseComp
==========================================================

A fake mouse that follows the mouse position and triggers events. \[Guide about fake mouse\](https://v4000.kaplayjs.com/guides/fake\_mouse/)

`param`opt\- Options for the fake mouse comp. See

`returns`The fake mouse comp.

`since`v3001.0



[serializeAnimation](#serializeAnimation)(obj: GameObj, name: string): Animation
================================================================================

Serializes the animation to plain objects

`param`obj\- The game obj to serialize.

`returns`The serialized animation.

`since`v3001.0



[sentry](#sentry)(candidates: SentryCandidates, opt?: SentryCompOpt): SentryComp
================================================================================

A sentry which reacts to objects coming into view.

`returns`The sentry comp.

`since`v3001.0



[patrol](#patrol)(opts: PatrolCompOpt): PatrolComp
==================================================

A patrol which can follow waypoints to a goal.

`since`v3001.0



[pathfinder](#pathfinder)(opts: PathfinderCompOpt): PathfinderComp
==================================================================

A navigator pathfinder which can calculate waypoints to a goal.

`since`v3001.0



[Comp](#Comp):
==============

[id](#Comp-id)?: Tag
====================

Component ID (if left out won't be treated as a comp).

[require](#Comp-require)?: Tag\[\]
==================================

What other comps this comp depends on.

[add](#Comp-add)?(): void
=========================

Event that runs when host game obj is added to scene.

[fixedUpdate](#Comp-fixedUpdate)?(): void
=========================================

Event that runs at a fixed frame rate.

[update](#Comp-update)?(): void
===============================

Event that runs every frame.

[draw](#Comp-draw)?(): void
===========================

Event that runs every frame after update.

[destroy](#Comp-destroy)?(): void
=================================

Event that runs when obj is removed from scene.

[inspect](#Comp-inspect)?(): string | null
==========================================

Debug info for inspect mode.

[drawInspect](#Comp-drawInspect)?(): void
=========================================

Draw debug info in inspect mode

`since`v3000.0



[CircleComp](#CircleComp):
==========================

The circle`circle()` component.

[draw](#CircleComp-draw): Comp\[draw\]
======================================

[radius](#CircleComp-radius): number
====================================

Radius of circle.

[renderArea](#CircleComp-renderArea)(): Circle
==============================================

Render area of the circle.

`since`v3000.0



[CircleCompOpt](#CircleCompOpt):
================================

Options for the circle\`circle()\`\` component.

[fill](#CircleCompOpt-fill)?: boolean
=====================================

If fill the circle (useful if you only want to render outline with outline`outline()` component).



[ColorComp](#ColorComp):
========================

The color`color()` component.

[color](#ColorComp-color): Color
================================



[EllipseComp](#EllipseComp):
============================

The ellipse`ellipse()` component.

[draw](#EllipseComp-draw): Comp\[draw\]
=======================================

[radiusX](#EllipseComp-radiusX): number
=======================================

Semi-major axis of ellipse.

[radiusY](#EllipseComp-radiusY): number
=======================================

Semi-minor axis of ellipse.

[renderArea](#EllipseComp-renderArea)(): Ellipse
================================================

Render area of the ellipse.



[EllipseCompOpt](#EllipseCompOpt):
==================================

Options for the ellipse\`ellipse()\`\` component.

[fill](#EllipseCompOpt-fill)?: boolean
======================================

If fill is false, the ellipse is not filled (useful if you only want to render outline with outline`outline()` component).



[MaskComp](#MaskComp):
======================

The mask`mask()` component.

[mask](#MaskComp-mask): Mask
============================



[OpacityComp](#OpacityComp):
============================

The opacity`opacity()` component.

[opacity](#OpacityComp-opacity): number
=======================================

Opacity of the current object.

[fadeIn](#OpacityComp-fadeIn)(time?: number, easeFunc?: EaseFunc): TweenController
==================================================================================

Fade in at the start.

[fadeOut](#OpacityComp-fadeOut)(time?: number, easeFunc?: EaseFunc): TweenController
====================================================================================

Fade out at the start.



[OutlineComp](#OutlineComp):
============================

The outline`outline()` component.

[outline](#OutlineComp-outline): Outline
========================================



[ParticlesOpt](#ParticlesOpt):

[max](#undefined-max): number
=============================

Maximum number of simultaneously rendered particles.

[lifeTime](#undefined-lifeTime)?: \[number, number\]
====================================================

Minimum and maximum lifetime of a particle in seconds.

[speed](#undefined-speed)?: \[number, number\]
==============================================

Minimum and maximum speed of a particle in pixels per second.

[acceleration](#undefined-acceleration)?: \[Vec2, Vec2\]
========================================================

Minimum and maximum acceleration of a particle in pixels per second^2.

[damping](#undefined-damping)?: \[number, number\]
==================================================

Minimum and maximum damping of a particle.

[angle](#undefined-angle)?: \[number, number\]
==============================================

Minimum and maximum start angle of a particle.

[angularVelocity](#undefined-angularVelocity)?: \[number, number\]
==================================================================

Minimum and maximum angular velocity of a particle.

[scales](#undefined-scales)?: number\[\]
========================================

Scale from start to end for a particle.

[colors](#undefined-colors)?: Color\[\]
=======================================

Colors from start to end for a particle.

[opacities](#undefined-opacities)?: number\[\]
==============================================

Opacity from start to end for a particle.

[quads](#undefined-quads)?: Quad\[\]
====================================

Quads from start to end for a particle.

[texture](#undefined-texture): Texture
======================================

Texture used for the particle.




===================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

Options for the particles`particles()`'s component



[ParticlesComp](#ParticlesComp):
================================

The particles`particles()` component.

[emitter](#ParticlesComp-emitter):

[position](#undefined-position): Vec2
=====================================

Relative position of the emitter

[direction](#undefined-direction): number
=========================================

Relative direction of the emitter




=============================================================================================================================================================================================================================================================================

[emit](#ParticlesComp-emit)(n: number): void
============================================

Emit a number of particles

[onEnd](#ParticlesComp-onEnd)(cb: ()\=>void): void
==================================================

Called when the emitter expires



[PolygonComp](#PolygonComp):
============================

The polygon`polygon()` component.

`since`v3001.0

[draw](#PolygonComp-draw): Comp\[draw\]
=======================================

[pts](#PolygonComp-pts): Vec2\[\]
=================================

Points in the polygon.

[radius](#PolygonComp-radius)?: number | number\[\]
===================================================

The radius of each corner.

[colors](#PolygonComp-colors)?: Color\[\]
=========================================

The color of each vertex.

[uv](#PolygonComp-uv)?: Vec2\[\]
================================

The uv of each vertex.

`since`v3001.0

[tex](#PolygonComp-tex)?: Texture
=================================

The texture used when uv coordinates are present.

`since`v3001.0

[renderArea](#PolygonComp-renderArea)(): Polygon
================================================



[PolygonCompOpt](#PolygonCompOpt): Omit<DrawPolygonOpt, pts\>
=============================================================

Options for the polygon`polygon()` component.



[RectComp](#RectComp):
======================

The rect`rect()` component.

[draw](#RectComp-draw): Comp\[draw\]
====================================

[width](#RectComp-width): number
================================

Width of rectangle.

[height](#RectComp-height): number
==================================

Height of rectangle.

[radius](#RectComp-radius)?: number | \[number, number, number, number\]
========================================================================

The radius of each corner.

[renderArea](#RectComp-renderArea)(): Rect
==========================================

`since`v3000.0



[RectCompOpt](#RectCompOpt):
============================

Options for the rect`rect()` component.

[radius](#RectCompOpt-radius)?: number | \[number, number, number, number\]
===========================================================================

Radius of the rectangle corners.

[fill](#RectCompOpt-fill)?: boolean
===================================

If fill the rectangle (useful if you only want to render outline with outline() component).



[ShaderComp](#ShaderComp):
==========================

The shader`shader()` component.

[uniform](#ShaderComp-uniform)?: Uniform
========================================

[shader](#ShaderComp-shader): string
====================================



[SpriteComp](#SpriteComp):
==========================

The sprite`sprite()` component.

[draw](#SpriteComp-draw): Comp\[draw\]
======================================

[sprite](#SpriteComp-sprite): string
====================================

Name of the sprite.

[width](#SpriteComp-width): number
==================================

Width for sprite.

[height](#SpriteComp-height): number
====================================

Height for sprite.

[frame](#SpriteComp-frame): number
==================================

Current frame in the entire spritesheet.

[animFrame](#SpriteComp-animFrame): number
==========================================

Current frame in relative to the animation that is currently playing.

[quad](#SpriteComp-quad): Quad
==============================

The rectangular area of the texture to render.

[play](#SpriteComp-play)(anim: string, options?: SpriteAnimPlayOpt): void
=========================================================================

Play a piece of anim.

[stop](#SpriteComp-stop)(): void
================================

Stop current anim.

[numFrames](#SpriteComp-numFrames)(): number
============================================

Get total number of frames.

[getCurAnim](#SpriteComp-getCurAnim)(): SpriteCurAnim | null
============================================================

Get the current animation data.

`since`v3001.0

[curAnim](#SpriteComp-curAnim)(): string | undefined
====================================================

Get current anim name.

`deprecated`Use \`getCurAnim().name\` instead.

[hasAnim](#SpriteComp-hasAnim)(name: string): boolean
=====================================================

Check if object's sprite has an animation.

[getAnim](#SpriteComp-getAnim)(name: string): SpriteAnim | null
===============================================================

Get an animation.

[animSpeed](#SpriteComp-animSpeed): number
==========================================

Speed multiplier for all animations (for the actual fps for an anim use .play("anim", { speed: 10 })).

[flipX](#SpriteComp-flipX): boolean
===================================

Flip texture horizontally.

[flipY](#SpriteComp-flipY): boolean
===================================

Flip texture vertically.

[onAnimStart](#SpriteComp-onAnimStart)(action: (anim: string)\=>void): KEventController
=======================================================================================

Register an event that runs when an animation is played.

[onAnimEnd](#SpriteComp-onAnimEnd)(action: (anim: string)\=>void): KEventController
===================================================================================

Register an event that runs when an animation is ended.

[renderArea](#SpriteComp-renderArea)(): Rect
============================================

`since`v3000.0



[SpriteCompOpt](#SpriteCompOpt):
================================

Options for the sprite`sprite()` component.

[frame](#SpriteCompOpt-frame)?: number
======================================

If the sprite is loaded with multiple frames, or sliced, use the frame option to specify which frame to draw.

[tiled](#SpriteCompOpt-tiled)?: boolean
=======================================

If provided width and height, don't stretch but instead render tiled.

[width](#SpriteCompOpt-width)?: number
======================================

Stretch sprite to a certain width.

[height](#SpriteCompOpt-height)?: number
========================================

Stretch sprite to a certain height.

[anim](#SpriteCompOpt-anim)?: string
====================================

Play an animation on start.

[animSpeed](#SpriteCompOpt-animSpeed)?: number
==============================================

Speed multiplier for all animations (for the actual fps for an anim use .play("anim", { speed: 10 })).

[flipX](#SpriteCompOpt-flipX)?: boolean
=======================================

Flip texture horizontally.

[flipY](#SpriteCompOpt-flipY)?: boolean
=======================================

Flip texture vertically.

[quad](#SpriteCompOpt-quad)?: Quad
==================================

The rectangular sub-area of the texture to render, default to full texture \`quad(0, 0, 1, 1)\`.

[fill](#SpriteCompOpt-fill)?: boolean
=====================================

If fill the sprite (useful if you only want to render outline with outline() component).



[TextComp](#TextComp):
======================

The text`text()` component.

[draw](#TextComp-draw): Comp\[draw\]
====================================

[text](#TextComp-text): string
==============================

The text to render.

[renderedText](#TextComp-renderedText): string
==============================================

The text after formatting.

[textSize](#TextComp-textSize): number
======================================

The text size.

[font](#TextComp-font): string | BitmapFontData
===============================================

The font to use.

[width](#TextComp-width): number
================================

Width of text.

[height](#TextComp-height): number
==================================

Height of text.

[align](#TextComp-align): TextAlign
===================================

Text alignment ("left", "center" or "right", default "left").

`since`v3000.0

[lineSpacing](#TextComp-lineSpacing): number
============================================

The gap between each line.

`since`v2000.2

[letterSpacing](#TextComp-letterSpacing): number
================================================

The gap between each character.

`since`v2000.2

[textTransform](#TextComp-textTransform): CharTransform | CharTransformFunc
===========================================================================

Transform the pos, scale, rotation or color for each character based on the index or char.

`since`v2000.1

[textStyles](#TextComp-textStyles): Record<string, CharTransform | CharTransformFunc\>
======================================================================================

Stylesheet for styled chunks, in the syntax of "this is a \[style\]text\[/style\] word".

`since`v2000.2

[renderArea](#TextComp-renderArea)(): Rect
==========================================

`since`v3000.0



[TextCompOpt](#TextCompOpt):
============================

Options for the text`text()` component.

[size](#TextCompOpt-size)?: number
==================================

Height of text.

[font](#TextCompOpt-font)?: string | BitmapFontData
===================================================

The font to use.

[width](#TextCompOpt-width)?: number
====================================

Wrap text to a certain width.

[align](#TextCompOpt-align)?: TextAlign
=======================================

Text alignment ("left", "center" or "right", default "left").

`since`v3000.0

[lineSpacing](#TextCompOpt-lineSpacing)?: number
================================================

The gap between each line.

`since`v2000.2

[letterSpacing](#TextCompOpt-letterSpacing)?: number
====================================================

The gap between each character.

`since`v2000.2

[transform](#TextCompOpt-transform)?: CharTransform | CharTransformFunc
=======================================================================

Transform the pos, scale, rotation or color for each character based on the index or char.

`since`v2000.1

[styles](#TextCompOpt-styles)?: Record<string, CharTransform | CharTransformFunc\>
==================================================================================

Stylesheet for styled chunks, in the syntax of "this is a \[style\]text\[/style\] word".

`since`v2000.2

[indentAll](#TextCompOpt-indentAll)?: boolean
=============================================

If true, any (whitespace) indent on the first line of the paragraph will be copied to all of the lines for those parts that text-wrap.



[UVQuadComp](#UVQuadComp):
==========================

The uvquad`uvquad()` component.

[draw](#UVQuadComp-draw): Comp\[draw\]
======================================

[width](#UVQuadComp-width): number
==================================

Width of rect.

[height](#UVQuadComp-height): number
====================================

Height of height.

[renderArea](#UVQuadComp-renderArea)(): Rect
============================================

`since`v3000.0



[AgentComp](#AgentComp):
========================

The agent`agent()` component.

[agentSpeed](#AgentComp-agentSpeed): number
===========================================

[allowDiagonals](#AgentComp-allowDiagonals): boolean
====================================================

[getDistanceToTarget](#AgentComp-getDistanceToTarget)(): number
===============================================================

[getNextLocation](#AgentComp-getNextLocation)(): Vec2 | null
============================================================

[getPath](#AgentComp-getPath)(): Vec2\[\] | null
================================================

[getTarget](#AgentComp-getTarget)(): Vec2 | null
================================================

[isNavigationFinished](#AgentComp-isNavigationFinished)(): boolean
==================================================================

[isTargetReachable](#AgentComp-isTargetReachable)(): boolean
============================================================

[isTargetReached](#AgentComp-isTargetReached)(): boolean
========================================================

[setTarget](#AgentComp-setTarget)(target: Vec2): void
=====================================================

[onNavigationStarted](#AgentComp-onNavigationStarted)(cb: ()\=>void): KEventController
======================================================================================

[onNavigationNext](#AgentComp-onNavigationNext)(cb: ()\=>void): KEventController
================================================================================

[onNavigationEnded](#AgentComp-onNavigationEnded)(cb: ()\=>void): KEventController
==================================================================================

[onTargetReached](#AgentComp-onTargetReached)(cb: ()\=>void): KEventController
==============================================================================



[AgentCompOpt](#AgentCompOpt):

[speed](#undefined-speed)?: number
==================================

[allowDiagonals](#undefined-allowDiagonals)?: boolean
=====================================================




======================================================================================================================================================================================================================

Options for the agent`agent()` component.



[FixedComp](#FixedComp):
========================

The fixed`fixed()` component.

[fixed](#FixedComp-fixed): boolean
==================================

If the obj is unaffected by camera



[PosComp](#PosComp):
====================

The pos`pos()` component.

[pos](#PosComp-pos): Vec2
=========================

Object's current world position.

[move](#PosComp-move)(xVel: number, yVel: number): void
=======================================================

Move how many pixels per second. If object is 'solid', it won't move into other 'solid' objects.

[move](#PosComp-move)(vel: Vec2): void
======================================

[moveBy](#PosComp-moveBy)(dx: number, dy: number): void
=======================================================

Move how many pixels, without multiplying dt, but still checking for 'solid'.

[moveBy](#PosComp-moveBy)(d: Vec2): void
========================================

[moveTo](#PosComp-moveTo)(dest: Vec2, speed?: number): void
===========================================================

Move to a spot with a speed (pixels per second), teleports if speed is not given.

[moveTo](#PosComp-moveTo)(x: number, y: number, speed?: number): void
=====================================================================

[screenPos](#PosComp-screenPos)(): Vec2 | null
==============================================

Get the position of the object on the screen.

[worldPos](#PosComp-worldPos)(): Vec2 | null
============================================

Get the position of the object relative to the root.

[toScreen](#PosComp-toScreen)(this: GameObj, p: Vec2): Vec2
===========================================================

Transform a local point (relative to this) to a screen point (relative to the camera)

[toWorld](#PosComp-toWorld)(this: GameObj, p: Vec2): Vec2
=========================================================

Transform a local point (relative to this) to a world point (relative to the root)

`since`v3001.0

[fromScreen](#PosComp-fromScreen)(this: GameObj, p: Vec2): Vec2
===============================================================

Transform a screen point (relative to the camera) to a local point (relative to this)

`since`v3001.0

[fromWorld](#PosComp-fromWorld)(this: GameObj, p: Vec2): Vec2
=============================================================

Transform a world point (relative to the root) to a local point (relative to this)

`since`v3001.0

[toOther](#PosComp-toOther)(this: GameObj, other: GameObj, p: Vec2): Vec2
=========================================================================

Transform a point relative to this to a point relative to other

`since`v3001.0

[fromOther](#PosComp-fromOther)(this: GameObj, other: GameObj, p: Vec2): Vec2
=============================================================================

Transform a point relative to other to a point relative to this

`since`v3001.0



[SentryComp](#SentryComp):
==========================

The sentry`sentry()` component.

[direction](#SentryComp-direction)?: Vec2
=========================================

The direction the sentry is pointing to.

[directionAngle](#SentryComp-directionAngle)?: number
=====================================================

The direction of the sentry as an angle in degrees.

[fieldOfView](#SentryComp-fieldOfView)?: number
===============================================

The field of view of the sentry in degrees.

[spotted](#SentryComp-spotted): GameObj\[\]
===========================================

The objects spotted most recently.

[onObjectsSpotted](#SentryComp-onObjectsSpotted)(cb: (objects: GameObj\[\])\=>void): KEventController
=====================================================================================================

Attaches an event handler which is called when objects of interest are spotted.

`param`cbThe event handler called when objects are spotted.

[isWithinFieldOfView](#SentryComp-isWithinFieldOfView)(obj: GameObj, direction?: Vec2, fieldOfView?: number): boolean
=====================================================================================================================

Returns true if the object is within the field of view.

`param`objThe object to test.

`param`directionThe direction to look at.

`param`fieldOfViewThe field of view in degrees.

[hasLineOfSight](#SentryComp-hasLineOfSight)(obj: GameObj): boolean
===================================================================

Returns true if there is a line of sight to the object.

`param`objThe object to test.



[SentryCompOpt](#SentryCompOpt):
================================

Options for the sentry`sentry()` component.

[direction](#SentryCompOpt-direction)?: Vec2 | number
=====================================================

The direction the sentry is pointing to. If undefined, direction has no influence.

[fieldOfView](#SentryCompOpt-fieldOfView)?: number
==================================================

The field of view of the sentry in degrees. If undefined, defaults to human fov of 200 degrees.

[lineOfSight](#SentryCompOpt-lineOfSight)?: boolean
===================================================

If true, line of sight matters. This means that objects which are blocked from view by areas are invisible.

[raycastExclude](#SentryCompOpt-raycastExclude)?: string\[\]
============================================================

When using line of sight, the objects which are transparent for the ray. Include at least a tag identifying the sentry.

[checkFrequency](#SentryCompOpt-checkFrequency)?: number
========================================================

The frequency of checking, defaults to every second.



[TileComp](#TileComp):
======================

The tile`tile()` component.

[tilePos](#TileComp-tilePos): Vec2
==================================

The tile position inside the level.

[isObstacle](#TileComp-isObstacle): boolean
===========================================

If the tile is an obstacle in pathfinding.

[cost](#TileComp-cost): number
==============================

How much a tile is cost to traverse in pathfinding (default 0).

[edges](#TileComp-edges): Edge\[\]
==================================

If the tile has hard edges that cannot pass in pathfinding.

[tilePosOffset](#TileComp-tilePosOffset): Vec2
==============================================

Position offset when setting \`tilePos\`.

[edgeMask](#TileComp-edgeMask): EdgeMask
========================================

[getLevel](#TileComp-getLevel)(): GameObj<LevelComp\>
=====================================================

[tileMove](#TileComp-tileMove)(dir: Vec2): void
===============================================

[moveLeft](#TileComp-moveLeft)(): void
======================================

[moveRight](#TileComp-moveRight)(): void
========================================

[moveUp](#TileComp-moveUp)(): void
==================================

[moveDown](#TileComp-moveDown)(): void
======================================



[TileCompOpt](#TileCompOpt):

[isObstacle](#undefined-isObstacle)?: boolean
=============================================

If the tile is an obstacle in pathfinding.

[cost](#undefined-cost)?: number
================================

How much a tile is cost to traverse in pathfinding (default 0).

[edges](#undefined-edges)?: Edge\[\]
====================================

If the tile has hard edges that cannot pass in pathfinding.

[offset](#undefined-offset)?: Vec2
==================================

Position offset when setting \`tilePos\`.




=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

Options for the tile`tile()` component.



[HealthComp](#HealthComp):
==========================

The health`health()` component.

[hurt](#HealthComp-hurt)(n?: number): void
==========================================

Decrease HP by n (defaults to 1).

[heal](#HealthComp-heal)(n?: number): void
==========================================

Increase HP by n (defaults to 1).

[hp](#HealthComp-hp)(): number
==============================

Current health points.

[setHP](#HealthComp-setHP)(hp: number): void
============================================

Set current health points.

[maxHP](#HealthComp-maxHP)(): number | null
===========================================

Max amount of HP.

[setMaxHP](#HealthComp-setMaxHP)(hp: number): void
==================================================

Set max amount of HP.

[onHurt](#HealthComp-onHurt)(action: (amount?: number)\=>void): KEventController
================================================================================

Register an event that runs when hurt() is called upon the object.

`since`v2000.1

[onHeal](#HealthComp-onHeal)(action: (amount?: number)\=>void): KEventController
================================================================================

Register an event that runs when heal() is called upon the object.

`since`v2000.1

[onDeath](#HealthComp-onDeath)(action: ()\=>void): KEventController
===================================================================

Register an event that runs when object's HP is equal or below 0.

`since`v2000.1



[LifespanCompOpt](#LifespanCompOpt):
====================================

The lifespan`lifespan()` component.

[fade](#LifespanCompOpt-fade)?: number
======================================

Fade out duration (default 0 which is no fade out).



[NamedComp](#NamedComp):
========================

The named`named()` component.



[StateComp](#StateComp):
========================

The state`state()` component.

[state](#StateComp-state): string
=================================

Current state.

[enterState](#StateComp-enterState)(state: string, args: any): void
===================================================================

Enter a state, trigger onStateEnd for previous state and onStateEnter for the new State state.

[onStateTransition](#StateComp-onStateTransition)(from: string, to: string, action: ()\=>void): KEventController
================================================================================================================

Register event that runs once when a specific state transition happens. Accepts arguments passed from \`enterState(name, ...args)\`.

`since`v2000.2

[onStateEnter](#StateComp-onStateEnter)(state: string, action: (args: any)\=>void): KEventController
====================================================================================================

Register event that runs once when enters a specific state. Accepts arguments passed from \`enterState(name, ...args)\`.

[onStateEnd](#StateComp-onStateEnd)(state: string, action: ()\=>void): KEventController
=======================================================================================

Register an event that runs once when leaves a specific state.

[onStateUpdate](#StateComp-onStateUpdate)(state: string, action: ()\=>void): KEventController
=============================================================================================

Register an event that runs every frame when in a specific state.

[onStateDraw](#StateComp-onStateDraw)(state: string, action: ()\=>void): KEventController
=========================================================================================

Register an event that runs every frame when in a specific state.



[StayComp](#StayComp):
======================

The stay`stay()` component.

[stay](#StayComp-stay): boolean
===============================

If the obj should not be destroyed on scene switch.

[scenesToStay](#StayComp-scenesToStay)?: string\[\]
===================================================

Array of scenes that the obj will stay on.



[TextInputComp](#TextInputComp):
================================

The textInput`textInput()` component.

[hasFocus](#TextInputComp-hasFocus): boolean
============================================

Enable the text input array from being modified by user input.

[typedText](#TextInputComp-typedText): string
=============================================

The "real" text that the user typed, without any escaping.



[TimerComp](#TimerComp):
========================

The timer`timer()` component.

[maxLoopsPerFrame](#TimerComp-maxLoopsPerFrame): number
=======================================================

The maximum number of loops per frame allowed, to keep loops with sub-frame intervals from freezing the game.

[wait](#TimerComp-wait)(time: number, action?: ()\=>void): TimerController
==========================================================================

Run the callback after n seconds.

[loop](#TimerComp-loop)(time: number, action: ()\=>void, maxLoops?: number, waitFirst?: boolean): TimerController
=================================================================================================================

Run the callback every n seconds. If waitFirst is false (the default), the function will be called once on the very next frame, and then loop like normal.

`since`v3000.0

[tween](#TimerComp-tween)<V\>(from: V, to: V, duration: number, setValue: (value: V)\=>void, easeFunc?: (t: number)\=>number): TweenController
==============================================================================================================================================

Tweeeeen! Note that this doesn't specifically mean tweening on this object's property, this just registers the timer on this object, so the tween will cancel with the object gets destroyed, or paused when obj.paused is true.

`since`v3000.0



[AreaComp](#AreaComp):
======================

The area`area()` component.

[area](#AreaComp-area):

[shape](#undefined-shape): Shape | null
=======================================

If we use a custom shape over render shape.

[scale](#undefined-scale): Vec2
===============================

Area scale.

[offset](#undefined-offset): Vec2
=================================

Area offset.

[cursor](#undefined-cursor): Cursor | null
==========================================

Cursor on hover.




===================================================================================================================================================================================================================================================================================================================================================================================================================================

Collider area info.

[collisionIgnore](#AreaComp-collisionIgnore): Tag\[\]
=====================================================

If this object should ignore collisions against certain other objects.

`since`v3000.0

[restitution](#AreaComp-restitution)?: number
=============================================

[friction](#AreaComp-friction)?: number
=======================================

[isClicked](#AreaComp-isClicked)(): boolean
===========================================

If was just clicked on last frame.

[isHovering](#AreaComp-isHovering)(): boolean
=============================================

If is being hovered on.

[checkCollision](#AreaComp-checkCollision)(other: GameObj): Collision | null
============================================================================

Check collision with another game obj.

`since`v3000.0

[getCollisions](#AreaComp-getCollisions)(): Collision\[\]
=========================================================

Get all collisions currently happening.

`since`v3000.0

[isColliding](#AreaComp-isColliding)(o: GameObj): boolean
=========================================================

If is currently colliding with another game obj.

[isOverlapping](#AreaComp-isOverlapping)(o: GameObj): boolean
=============================================================

If is currently overlapping with another game obj (like isColliding, but will return false if the objects are just touching edges).

[onClick](#AreaComp-onClick)(f: ()\=>void, btn?: MouseButton): void
===================================================================

Register an event runs when clicked.

`since`v2000.1

[onHover](#AreaComp-onHover)(action: ()\=>void): KEventController
=================================================================

Register an event runs once when hovered.

`since`v3000.0

[onHoverUpdate](#AreaComp-onHoverUpdate)(action: ()\=>void): KEventController
=============================================================================

Register an event runs every frame when hovered.

`since`v3000.0

[onHoverEnd](#AreaComp-onHoverEnd)(action: ()\=>void): KEventController
=======================================================================

Register an event runs once when unhovered.

`since`v3000.0

[onCollide](#AreaComp-onCollide)(tag: Tag, f: (obj: GameObj, col?: Collision)\=>void): void
===========================================================================================

Register an event runs once when collide with another game obj with certain tag.

`since`v2001.0

[onCollide](#AreaComp-onCollide)(f: (obj: GameObj, col?: Collision)\=>void): void
=================================================================================

Register an event runs once when collide with another game obj.

`since`v2000.1

[onCollideUpdate](#AreaComp-onCollideUpdate)(tag: Tag, f: (obj: GameObj, col?: Collision)\=>void): KEventController
===================================================================================================================

Register an event runs every frame when collide with another game obj with certain tag.

`since`v3000.0

[onCollideUpdate](#AreaComp-onCollideUpdate)(f: (obj: GameObj, col?: Collision)\=>void): KEventController
=========================================================================================================

Register an event runs every frame when collide with another game obj.

`since`v3000.0

[onCollideEnd](#AreaComp-onCollideEnd)(tag: Tag, f: (obj: GameObj)\=>void): KEventController
============================================================================================

Register an event runs once when stopped colliding with another game obj with certain tag.

`since`v3000.0

[onCollideEnd](#AreaComp-onCollideEnd)(f: (obj: GameObj)\=>void): void
======================================================================

Register an event runs once when stopped colliding with another game obj.

`since`v3000.0

[hasPoint](#AreaComp-hasPoint)(p: Vec2): boolean
================================================

If has a certain point inside collider.

[resolveCollision](#AreaComp-resolveCollision)(obj: GameObj): void
==================================================================

Push out from another solid game obj if currently overlapping.

[localArea](#AreaComp-localArea)(): Shape
=========================================

Get the geometry data for the collider in local coordinate space.

`since`v3000.0

[worldArea](#AreaComp-worldArea)(): Shape
=========================================

Get the geometry data for the collider in world coordinate space.

[screenArea](#AreaComp-screenArea)(): Shape
===========================================

Get the geometry data for the collider in screen coordinate space.



[AreaCompOpt](#AreaCompOpt):
============================

Options for the area`area()` component.

[shape](#AreaCompOpt-shape)?: Shape
===================================

The shape of the area (currently only Rect and Polygon is supported).

    add([
        sprite("butterfly"),
        pos(100, 200),
        // a triangle shape!
        area({ shape: new Polygon([vec2(0), vec2(100), vec2(-100, 100)]) }),
    ])


[scale](#AreaCompOpt-scale)?: number | Vec2
===========================================

Area scale.

[offset](#AreaCompOpt-offset)?: Vec2
====================================

Area offset.

[cursor](#AreaCompOpt-cursor)?: Cursor
======================================

Cursor on hover.

[collisionIgnore](#AreaCompOpt-collisionIgnore)?: Tag\[\]
=========================================================

If this object should ignore collisions against certain other objects.

`since`v3000.0

[restitution](#AreaCompOpt-restitution)?: number
================================================

Bounciness factor between 0 and 1.

`since`v4000.0

[friction](#AreaCompOpt-friction)?: number
==========================================

Friction factor between 0 and 1.

`since`v4000.0



[BodyComp](#BodyComp):
======================

The body`body()` component.

[vel](#BodyComp-vel): Vec2
==========================

Object current velocity.

`since`v3001.0

[damping](#BodyComp-damping): number
====================================

How much velocity decays (velocity \*= 1 / (1 + damping \* dt) every frame).

`since`v3001.0

[isStatic](#BodyComp-isStatic): boolean
=======================================

If object is static, it won't move, all non static objects won't move past it, and all calls to addForce(), applyImpulse(), or jump() on this body will do absolutely nothing.

[jumpForce](#BodyComp-jumpForce): number
========================================

Initial speed in pixels per second for jump().

[gravityScale](#BodyComp-gravityScale): number
==============================================

Gravity multiplier.

[mass](#BodyComp-mass): number
==============================

Mass of the body, decides how much a non-static body should move when resolves with another non-static body. (default 1).

`since`v3000.0

[stickToPlatform](#BodyComp-stickToPlatform)?: boolean
======================================================

If object should move with moving platform (default true).

`since`v3000.0

[curPlatform](#BodyComp-curPlatform)(): GameObj | null
======================================================

Current platform landing on.

[isGrounded](#BodyComp-isGrounded)(): boolean
=============================================

If currently landing on a platform.

`since`v2000.1

[isFalling](#BodyComp-isFalling)(): boolean
===========================================

If currently falling.

`since`v2000.1

[isJumping](#BodyComp-isJumping)(): boolean
===========================================

If currently rising.

`since`v3000.0

[applyImpulse](#BodyComp-applyImpulse)(impulse: Vec2): void
===========================================================

Applies an impulse

`param`impulseThe impulse vector, applied directly

[addForce](#BodyComp-addForce)(force: Vec2): void
=================================================

Applies a force

`param`forceThe force vector, applied after scaled by the inverse mass

[jump](#BodyComp-jump)(force?: number): void
============================================

Upward thrust.

[onPhysicsResolve](#BodyComp-onPhysicsResolve)(action: (col: Collision)\=>void): KEventController
=================================================================================================

Register an event that runs when a collision is resolved.

`since`v3000.0

[onBeforePhysicsResolve](#BodyComp-onBeforePhysicsResolve)(action: (col: Collision)\=>void): KEventController
=============================================================================================================

Register an event that runs before a collision would be resolved.

`since`v3000.0

[onGround](#BodyComp-onGround)(action: ()\=>void): KEventController
===================================================================

Register an event that runs when the object is grounded.

`since`v2000.1

[onFall](#BodyComp-onFall)(action: ()\=>void): KEventController
===============================================================

Register an event that runs when the object starts falling.

`since`v2000.1

[onFallOff](#BodyComp-onFallOff)(action: ()\=>void): KEventController
=====================================================================

Register an event that runs when the object falls off platform.

`since`v3000.0

[onHeadbutt](#BodyComp-onHeadbutt)(action: ()\=>void): KEventController
=======================================================================

Register an event that runs when the object bumps into something on the head.

`since`v2000.1

[onLand](#BodyComp-onLand)(action: (obj: GameObj)\=>void): KEventController
===========================================================================

Register an event that runs when an object lands on this object.

`since`v3001.0

[onHeadbutted](#BodyComp-onHeadbutted)(action: (obj: GameObj)\=>void): KEventController
=======================================================================================

Register an event that runs when the object is bumped by another object head.



[BodyCompOpt](#BodyCompOpt):
============================

Options for the body`body()` component.

[damping](#BodyCompOpt-damping)?: number
========================================

How much velocity decays (velocity \*= 1 / (1 + damping \* dt) every frame).

`since`v3001.0

[jumpForce](#BodyCompOpt-jumpForce)?: number
============================================

Initial speed in pixels per second for jump().

[maxVelocity](#BodyCompOpt-maxVelocity)?: number
================================================

Maximum velocity when falling.

[gravityScale](#BodyCompOpt-gravityScale)?: number
==================================================

Gravity multiplier.

[isStatic](#BodyCompOpt-isStatic)?: boolean
===========================================

If object is static, it won't move, all non static objects won't move past it, and all calls to addForce(), applyImpulse(), or jump() on this body will do absolutely nothing.

`since`v3000.0

[stickToPlatform](#BodyCompOpt-stickToPlatform)?: boolean
=========================================================

If object should move with moving platform (default true).

`since`v3000.0

[mass](#BodyCompOpt-mass)?: number
==================================

Mass of the body, decides how much a non-static body should move when resolves with another non-static body. (default 1).

`since`v3000.0



[DoubleJumpComp](#DoubleJumpComp):
==================================

The doubleJump`doubleJump()` component.

[numJumps](#DoubleJumpComp-numJumps): number
============================================

Number of jumps allowed.

[doubleJump](#DoubleJumpComp-doubleJump)(force?: number): void
==============================================================

Performs double jump (the initial jump only happens if player is grounded).

[onDoubleJump](#DoubleJumpComp-onDoubleJump)(action: ()\=>void): KEventController
=================================================================================

Register an event that runs when the object performs the second jump when double jumping.



[AnchorComp](#AnchorComp):
==========================

The anchor`anchor()` component.

[anchor](#AnchorComp-anchor): Anchor | Vec2
===========================================

Anchor point for render.



[FollowComp](#FollowComp):
==========================

The follow`follow()` component.

[follow](#FollowComp-follow):

[obj](#undefined-obj): GameObj
==============================

[offset](#undefined-offset): Vec2
=================================




=====================================================================================================================================================================



[LayerComp](#LayerComp):
========================

The layer`layer()` component.

[layerIndex](#LayerComp-layerIndex)(): number | null
====================================================

Get the index of the current layer the object is assigned to.

`returns`The index of the layer the object is assigned to, or \`null\` if the layer does not exist.

[layer](#LayerComp-layer)(): string | null
==========================================

Get the name of the current layer the object is assigned to.

`returns`The name of the layer the object is assigned to.

[layer](#LayerComp-layer)(name: string):
========================================

Set the name of the layer the object should be assigned to.



[OffScreenComp](#OffScreenComp):
================================

The offscreen`offscreen()` component.

[isOffScreen](#OffScreenComp-isOffScreen)(): boolean
====================================================

If object is currently out of view.

[onExitScreen](#OffScreenComp-onExitScreen)(action: ()\=>void): KEventController
================================================================================

Register an event that runs when object goes out of view.

[onEnterScreen](#OffScreenComp-onEnterScreen)(action: ()\=>void): KEventController
==================================================================================

Register an event that runs when object enters view.



[OffScreenCompOpt](#OffScreenCompOpt):
======================================

Options for offscreen`offscreen()` component.

[hide](#OffScreenCompOpt-hide)?: boolean
========================================

If hide object when out of view.

[pause](#OffScreenCompOpt-pause)?: boolean
==========================================

If pause object when out of view.

[unpause](#OffScreenCompOpt-unpause)?: boolean
==============================================

If unpause object when back in view.

[destroy](#OffScreenCompOpt-destroy)?: boolean
==============================================

If destroy object when out of view.

[distance](#OffScreenCompOpt-distance)?: number
===============================================

The distance when out of view is triggered (default 200).

`since`v3000.0



[RotateComp](#RotateComp):
==========================

The rotate`rotate()` component.

[angle](#RotateComp-angle): number
==================================

Angle in degrees.

[rotateBy](#RotateComp-rotateBy)(angle: number): void
=====================================================

Rotate in degrees.

[rotateTo](#RotateComp-rotateTo)(s: number): void
=================================================

Rotate to a degree (like directly assign to .angle)

`since`v3000.0



[ScaleComp](#ScaleComp):
========================

The scale`scale()` component.

[scale](#ScaleComp-scale): Vec2
===============================

The current scale of the object

`returns`The current scale of the object as a

[scaleTo](#ScaleComp-scaleTo)(s: number): void
==============================================

Set the scale of the object to a number

[scaleTo](#ScaleComp-scaleTo)(s: Vec2): void
============================================

Set the scale of the object to a Vec2

[scaleTo](#ScaleComp-scaleTo)(sx: number, sy: number): void
===========================================================

Set the scale of the object to a number for x and y

[scaleBy](#ScaleComp-scaleBy)(s: number): void
==============================================

Scale the object by a number

[scaleBy](#ScaleComp-scaleBy)(s: Vec2): void
============================================

Scale the object by a Vec2

[scaleBy](#ScaleComp-scaleBy)(sx: number, sy: number): void
===========================================================

Scale the object by a number for x and y



[ZComp](#ZComp):
================

The z`z()` component.

[z](#ZComp-z): number
=====================

Defines the z-index of this game obj



[MergeComps](#MergeComps)<T\>: Omit<MergeObj, TypeOperator\>
============================================================

A type to merge the components of a game object, omitting the default component properties.



[CompList](#CompList)<T\>: Array<T | Tag\>
==========================================

A component list.



[EmptyComp](#EmptyComp):[id](#undefined-id): string
===========================

& Comp
=======================================================================================

A component without own properties.



[LevelComp](#LevelComp):
========================

A level component.

[tileWidth](#LevelComp-tileWidth)(): number
===========================================

[tileHeight](#LevelComp-tileHeight)(): number
=============================================

[numRows](#LevelComp-numRows)(): number
=======================================

[numColumns](#LevelComp-numColumns)(): number
=============================================

[spawn](#LevelComp-spawn)(sym: string, p: Vec2): GameObj | null
===============================================================

Spawn a tile from a symbol defined previously.

[spawn](#LevelComp-spawn)(sym: string, x: number, y: number): GameObj | null
============================================================================

[spawn](#LevelComp-spawn)<T\>(obj: CompList, p: Vec2): GameObj | null
=====================================================================

Spawn a tile from a component list.

`returns`The spawned game object, or null if the obj hasn't components.

[spawn](#LevelComp-spawn)<T\>(sym: CompList, x: number, y: number): GameObj | null
==================================================================================

[levelWidth](#LevelComp-levelWidth)(): number
=============================================

Total width of level in pixels.

[levelHeight](#LevelComp-levelHeight)(): number
===============================================

Total height of level in pixels.

[getAt](#LevelComp-getAt)(tilePos: Vec2): GameObj\[\]
=====================================================

Get all game objects that's currently inside a given tile.

[raycast](#LevelComp-raycast)(origin: Vec2, direction: Vec2): RaycastResult
===========================================================================

Raycast all game objects on the given path.

[tile2Pos](#LevelComp-tile2Pos)(tilePos: Vec2): Vec2
====================================================

Convert tile position to pixel position.

[tile2Pos](#LevelComp-tile2Pos)(x: number, y: number): Vec2
===========================================================

[pos2Tile](#LevelComp-pos2Tile)(pos: Vec2): Vec2
================================================

Convert pixel position to tile position.

[pos2Tile](#LevelComp-pos2Tile)(x: number, y: number): Vec2
===========================================================

[getTilePath](#LevelComp-getTilePath)(from: Vec2, to: Vec2, opts?: PathFindOpt): Vec2\[\] | null
================================================================================================

Find the path to navigate from one tile to another tile.

`returns`A list of traverse points in tile positions.

[getPath](#LevelComp-getPath)(from: Vec2, to: Vec2, opts?: PathFindOpt): Vec2\[\] | null
========================================================================================

Find the path to navigate from one tile to another tile.

`returns`A list of traverse points in pixel positions.

[getSpatialMap](#LevelComp-getSpatialMap)(): GameObj\[\]\[\]
============================================================

[removeFromSpatialMap](#LevelComp-removeFromSpatialMap)(obj: GameObj): void
===========================================================================

[insertIntoSpatialMap](#LevelComp-insertIntoSpatialMap)(obj: GameObj): void
===========================================================================

[onSpatialMapChanged](#LevelComp-onSpatialMapChanged)(cb: ()\=>void): KEventController
======================================================================================

[onNavigationMapInvalid](#LevelComp-onNavigationMapInvalid)(cb: ()\=>void): KEventController
============================================================================================

[invalidateNavigationMap](#LevelComp-invalidateNavigationMap)(): void
=====================================================================

[onNavigationMapChanged](#LevelComp-onNavigationMapChanged)(cb: ()\=>void): KEventController
============================================================================================



[getSceneName](#getSceneName)(): string | null
==============================================

Gets the name of the current scene. Returns null if no scene is active.

`since`v3001.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[scene](#scene)(name: SceneName, def: SceneDef): void
=====================================================

Define a scene.

`param`name\- The scene name.

`param`def\- The scene definition.

    // define a scene
    scene("game", () => {
    // ...
    });

    // get options
    scene("game", (opts) => {
        debug.log(opts.level);
    });



[go](#go)(name: SceneName, args: any): void
===========================================

Go to a scene, passing all rest args to scene callback.

`param`name\- The scene name.

`param`args\- The rest args to pass to the scene callback.

    // go to "game" scene
    go("game");

    // go with options
    go("game", { level: 1 });


`since`v2000.0



[layers](#layers)(layers: string\[\], defaultLayer: string): void
=================================================================

`param`layers\- The layer names.

`param`defaultLayer\- The default layer name.

`deprecated`Use

    setLayers(["bg", "obj", "ui"], "obj")

    // no layer specified, will be added to "obj"
    add([
         sprite("bean"),
    ]);

    // add to "bg" layer
    add([
        sprite("bg"),
        layer("bg"),
    ]);


`since`v3001.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[onGamepadConnect](#onGamepadConnect)(action: (gamepad: KGamepad)\=>void): KEventController
===========================================================================================

Register an event that runs when a gamepad is connected.

`param`action\- The function that runs when quit() is called.

    // watch for a controller connecting
    onGamepadConnect((gp) => {
        debug.log(`ohhi player ${gp.index + 1}`);
    });


`returns`The event controller.

`since`v3000.0



[onGamepadDisconnect](#onGamepadDisconnect)(action: (gamepad: KGamepad)\=>void): KEventController
=================================================================================================

Register an event that runs when a gamepad is disconnected.

`param`action\- The function that runs when quit() is called.

    // watch for a controller disconnecting
    onGamepadDisconnect((gp) => {
        debug.log(`ohbye player ${gp.index + 1}`);
    });


`returns`The event controller.

`since`v3000.0



[onClick](#onClick)(tag: Tag, action: (a: GameObj)\=>void): KEventController
============================================================================

Register an event that runs when game objs with certain tags are clicked (required to have the area() component).

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

    // click on any "chest" to open
    onClick("chest", (chest) => chest.open())


`returns`The event controller.

`since`v2000.1



[onClick](#onClick)(action: ()\=>void): KEventController
========================================================

Register an event that runs when users clicks.

`param`action\- The function to run when the event is triggered.

    // click on anywhere to go to "game" scene
    onClick(() => go("game"));


`returns`The event controller.

`since`v2000.1



[onKeyDown](#onKeyDown)(key: Key | Key\[\], action: (key: Key)\=>void): KEventController
========================================================================================

Register an event that runs every frame when a key is held down.

`param`key\- The key(s) to listen for.

`param`action\- The function to run when the event is triggered.

    // move left by SPEED pixels per frame every frame when left arrow key is being held down
    onKeyDown("left", () => {
        bean.move(-SPEED, 0)
    });


`returns`The event controller.

`since`v2000.1



[onKeyDown](#onKeyDown)(action: (key: Key)\=>void): KEventController
====================================================================

Register an event that runs every frame when any key is held down.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v2000.1



[onKeyPress](#onKeyPress)(key: Key | Key\[\], action: (key: Key)\=>void): KEventController
==========================================================================================

Register an event that runs when user presses certain keys.

`param`key\- The key(s) to listen for.

`param`action\- The function to run when the event is triggered.

    // .jump() once when "space" is just being pressed
    onKeyPress("space", () => {
        bean.jump();
    });

    onKeyPress(["up", "space"], () => {
        bean.jump();
    });


`returns`The event controller.

`since`v2000.1



[onKeyPress](#onKeyPress)(action: (key: Key)\=>void): KEventController
======================================================================

Register an event that runs when user presses any key.

`param`action\- The function to run when the event is triggered.

    // Call restart() when player presses any key
    onKeyPress((key) => {
        debug.log(`key pressed ${key}`);
        restart();
    });


`returns`The event controller.

`since`v3001.0



[onKeyPressRepeat](#onKeyPressRepeat)(k: Key | Key\[\], action: (k: Key)\=>void): KEventController
==================================================================================================

Register an event that runs when user presses certain keys (also fires repeatedly when the keys are being held down).

`param`k\- The key(s) to listen for.

`param`action\- The function to run when the event is triggered.

    // delete last character when "backspace" is being pressed and held
    onKeyPressRepeat("backspace", () => {
        input.text = input.text.substring(0, input.text.length - 1);
    });


`returns`The event controller.

`since`v3000.1



[onKeyPressRepeat](#onKeyPressRepeat)(action: (k: Key)\=>void): KEventController
================================================================================



[onKeyRelease](#onKeyRelease)(k: Key | Key\[\], action: (k: Key)\=>void): KEventController
==========================================================================================

Register an event that runs when user release certain keys.

`param`k\= The key(s) to listen for. See

`param`action\- The function that runs when a user releases certain keys

    // release `a` or `b` keys
    onKeyRelease([`a`, `b`], (k) => {
        debug.log(`Released the ${k} key...`);
    });


`returns`The event controller.

`since`v2000.1



[onKeyRelease](#onKeyRelease)(action: (k: Key)\=>void): KEventController
========================================================================

Register an event that runs when user releases a key.

`param`action\- The function that runs when a user releases a

    // release a key
    onKeyRelease((k) => {
        debug.log(`Released the ${k} key...`);
    });


`returns`The event controller.

`since`v2000.1



[onCharInput](#onCharInput)(action: (ch: string)\=>void): KEventController
==========================================================================

Register an event that runs when user inputs text.

`param`action\- The function to run when the event is triggered.

    // type into input
    onCharInput((ch) => {
        input.text += ch
    })


`returns`The event controller.

`since`v2000.1



[onMouseDown](#onMouseDown)(btn: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void): KEventController
==================================================================================================================

Register an event that runs every frame when certain mouse buttons are being held down.

`param`btn\- The mouse button(s) to listen for. See

`param`action\- The function that is run when certain mouse buttons are being held down.

    // count time with left mouse button down
    let mouseTime = 0;
    onMouseDown("left", () => {
        mouseTime += dt();
        debug.log(`Time with mouse down: ${mouseTime});
    });


`returns`The event controller.

`since`v3001.0



[onMouseDown](#onMouseDown)(action: (m: MouseButton)\=>void): KEventController
==============================================================================

Register an event that runs every frame when any mouse button is being held down.

`param`action\- The function that is run when any mouse button is being held down.

    // count time with any mouse button down
    let mouseTime = 0;
    onMouseDown((m) => {
        mouseTime += dt();
    });


`returns`The event controller.

`since`v3001.0



[onMousePress](#onMousePress)(action: (m: MouseButton)\=>void): KEventController
================================================================================

Register an event that runs when user clicks mouse.

`param`action\- The function that is run when user clicks a mouse button.

    // gives cookies on left press, remove on right press
    let cookies = 0;
    onMousePress(["left", "right"], (m) => {
        if (m == "left") {
            cookies++;
        } else {
            cookies--;
        }
    });


`returns`The event controller.

`since`v3001.0



[onMousePress](#onMousePress)(btn: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void): KEventController
====================================================================================================================

Register an event that runs when user clicks mouse.

`param`btn\- The mouse button(s) to listen for. See

`param`action\- The function that is run what the user clicks cetain mouse buttons.

    // gives cookies on any mouse press
    let cookies = 0;
    onMousePress((m) => {
        cookies++;
        debug.log(`Cookies: ${cookies}`);
    });


`returns`The event controller.

`since`v3001.0



[onMouseRelease](#onMouseRelease)(action: (m: MouseButton)\=>void): KEventController
====================================================================================

Register an event that runs when user releases mouse.

`param`action\- The function that is run what the user clicks a provided mouse button.

    // spawn bean where right mouse is released
    onMouseRelease("right", (m) => {
        debug.log(`${m} released, spawning bean...`);
        add([
            pos(mousePos()),
            sprite("bean"),
            anchor("center"),
        ]);
    });


`returns`The event controller.

`since`v3001.0



[onMouseRelease](#onMouseRelease)(btn: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void): KEventController
========================================================================================================================

Register an event that runs when user releases mouse.

`param`btn\- The button(s) to listen for. See

`param`action\- The function that is run what the user clicks a provided mouse button.

    // spawn bean where right mouse is released
    onMouseRelease((m) => {
        if (m == "right") {
            debug.log(`${m} released, spawning bean...`);
            add([
                pos(mousePos()),
                sprite("bean"),
                anchor("center"),
            ]);
        });
    });


`returns`The event controller.

`since`v3001.0



[onMouseMove](#onMouseMove)(action: (pos: Vec2, delta: Vec2)\=>void): KEventController
======================================================================================

Register an event that runs whenever user moves the mouse.

`param`action\- The function that is run what the user moves the mouse.

    // runs when the mouse has moved
    onMouseMove((p, d) => {
        bean.pos = p; // set bean position to mouse position
    });


`returns`The event controller.

`since`v2000.1



[onTouchStart](#onTouchStart)(action: (pos: Vec2, t: Touch)\=>void): KEventController
=====================================================================================

Register an event that runs when a touch starts.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v2000.1



[onTouchMove](#onTouchMove)(action: (pos: Vec2, t: Touch)\=>void): KEventController
===================================================================================

Register an event that runs whenever touch moves.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v2000.1



[onTouchEnd](#onTouchEnd)(action: (pos: Vec2, t: Touch)\=>void): KEventController
=================================================================================

Register an event that runs when a touch ends.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v2000.1



[onScroll](#onScroll)(action: (delta: Vec2)\=>void): KEventController
=====================================================================

Register an event that runs when mouse wheel scrolled.

`param`action\- The function to run when the event is triggered.

    // Zoom camera on scroll
    onScroll((delta) => {
        const zoom = delta.y / 500;
        camScale(camScale().add(zoom));
    });


`returns`The event controller.

`since`v3000.0



[onGamepadButtonDown](#onGamepadButtonDown)(btn: KGamepadButton | KGamepadButton\[\], action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
================================================================================================================================================================

Register an event that runs every frame when certain gamepad buttons are held down.

`param`btn\- The button(s) to listen for. See

`param`action\- The function that is run while certain gamepad buttons are held down.

    // when button is being held down
    onGamepadButtonDown("rtrigger", (gp) => {
        car.addForce(Vec2.fromAngle(car.angle).scale(10));
    });


`returns`The event controller.

`since`v3001.0



[onGamepadButtonDown](#onGamepadButtonDown)(action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
======================================================================================================================

Register an event that runs every frame when any gamepad buttons are held down.

`param`action\- The function that is run while any gamepad buttons are held down.

    // when button is being held down
    onGamepadButtonDown((btn, gp) => {
        if (btn == "rtrigger") {
            car.addForce(Vec2.fromAngle(car.angle).scale(10));
        } else if (btn == "ltrigger") {
            car.addForce(Vec2.fromAngle(car.angle).scale(-5));
        }
    });


`returns`The event controller.

`since`v3001.0



[onGamepadButtonPress](#onGamepadButtonPress)(btn: KGamepadButton | KGamepadButton\[\], action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
==================================================================================================================================================================

Register an event that runs when user presses certain gamepad button.

`param`btn\- The button(s) to listen for. See

`param`action\- The function that is run when certain gamepad buttons are pressed.

    // when user presses button
    onGamepadButtonPress("south", (btn, gp) => {
        player.jump(200);
    });


`returns`The event controller.

`since`v3001.0



[onGamepadButtonPress](#onGamepadButtonPress)(action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
========================================================================================================================

Register an event that runs when user presses any gamepad button.

`param`action\- The function that is run when any gamepad buttons is pressed.

    // when user presses button
    onGamepadButtonPress((btn, gp) => {
        if (btn == "south") {
            player.jump(200);     // jump
        }
    });


`returns`The event controller.

`since`v3001.0



[onGamepadButtonRelease](#onGamepadButtonRelease)(btn: KGamepadButton | KGamepadButton\[\], action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
======================================================================================================================================================================

Register an event that runs when user releases certain gamepad button

`param`btn\- The button(s) to listen for. See

`param`action\- The function that is run when certain gamepad buttons are released.

    // charged attack
    let chargeTime = 0
    onGamepadButtonPress("west", (btn, gp) => {
        chargeTime = time();
    });

    // when a gamepad button is released, this is run
    onGamepadButtonRelease("west", (btn, gp) => {
        let chargedt = time() - chargeTime;
        debug.log(`Used ${chargedt * 1000} power!`);
    });


`returns`The event controller.

`since`v3001.0



[onGamepadButtonRelease](#onGamepadButtonRelease)(action: (btn: KGamepadButton, gamepad: KGamepad)\=>void): KEventController
============================================================================================================================

Register an event that runs when user releases any gamepad button.

`param`action\- The function that is run when any gamepad buttons are released.

    // when a gamepad button is released, this is run
    onGamepadButtonRelease((btn, gp) => {
        if (btn == "north") {
            player.jump(500);
        }
    });


`returns`The event controller.

`since`v3000.0



[onGamepadStick](#onGamepadStick)(stick: GamepadStick, action: (value: Vec2, gameepad: KGamepad)\=>void): KEventController
==========================================================================================================================

Register an event that runs when the gamepad axis exists.

`param`stick\- The stick to listen for. See

`param`action\- The function that is run when a specific gamepad stick is moved.

    // player move
    let player = add([
        pos(center()),
        sprite(`bean`),
    ]);

    // when left stick is moved
    onGamepadStick("left", (stickVector, gp) => {
        player.move(stickVector.x, 0);
    });


`returns`The event controller.

`since`v3000.0



[onButtonPress](#onButtonPress)(btn: TButton | TButton\[\], action: (btn: TButton)\=>void): KEventController
============================================================================================================

Register an event that runs when user press a defined button (like "jump") on any input (keyboard, gamepad).

`param`btn\- The button(s) to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3001.0



[onButtonRelease](#onButtonRelease)(btn: TButton | TButton\[\], action: (btn: TButton)\=>void): KEventController
================================================================================================================

Register an event that runs when user release a defined button (like "jump") on any input (keyboard, gamepad).

`param`btn\- The button(s) to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3001.0



[onButtonRelease](#onButtonRelease)(action: (btn: TButton)\=>void): KEventController
====================================================================================



[onButtonDown](#onButtonDown)(btn: TButton | TButton\[\], action: (btn: TButton)\=>void): KEventController
==========================================================================================================

Register an event that runs when user press a defined button (like "jump") on any input (keyboard, gamepad).

`param`btn\- The button(s) to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3001.0



[onButtonDown](#onButtonDown)(action: (btn: TButton)\=>void): KEventController
==============================================================================



[isTouchscreen](#isTouchscreen)(): boolean
==========================================

Is currently on a touch screen device.

`returns`true if on a touch screen device.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[mousePos](#mousePos)(): Vec2
=============================

Get current mouse position (without camera transform).

`returns`The current mouse position.

`since`v2000.0



[mouseDeltaPos](#mouseDeltaPos)(): Vec2
=======================================

How much mouse moved last frame.

`returns`The delta mouse position.

`since`v2000.0



[isKeyDown](#isKeyDown)(k?: Key | Key\[\]): boolean
===================================================

If any or certain key(s) are currently down.

`param`k\- The key(s) to check.

    // Any key down

    let lastKeyTime = time()
    let triedToWakeUp = false

    onUpdate(() => {
        if (isKeyDown()) {
            lastKeyTime = time()
            triedToWakeUp = false
            return
        }

        if (triedToWakeUp || time() - lastKeyTime < 5) return

        debug.log("Wake up!")
        triedToWakeUp = true
    })

    // Certain key down
    // equivalent to the calling bean.move() in an onKeyDown("left")

    onUpdate(() => {
        if (isKeyDown("left")) {
            bean.move(-SPEED, 0)
        }
    })

    // Certain keys down

    let isMoving = false

    onUpdate(() => {
        isMoving = isKeyDown(["left", "right"])
    })


`since`v2000.0



[isKeyPressed](#isKeyPressed)(k?: Key | Key\[\]): boolean
=========================================================

If any or certain key(s) are just pressed last frame.

`param`k\- The key(s) to check.

    onUpdate(() => {
        if (!isKeyPressed()) return // early return as no key was pressed

        if (isKeyPressed("space")) debug.log("Pressed the jump key")
        if (isKeyPressed(["left", "right"])) debug.log("Pressed any of the move keys")
    })


`since`v2000.0



[isKeyPressedRepeat](#isKeyPressedRepeat)(k?: Key | Key\[\]): boolean
=====================================================================

If any or certain key(s) are just pressed last frame (also fires repeatedly when the keys are being held down).

`param`k\- The key(s) to check.

    let heldKeys = new Set()

    onUpdate(() => {
        if (isKeyPressedRepeat("space")) {
            pressedOrHeld(["space"], 'the jump key')
        } else if (isKeyPressedRepeat(["left", "right"])) {
            pressedOrHeld(["left", "right"], 'any of the move keys')
        } else if (isKeyPressedRepeat()) {
            pressedOrHeld(["any"], 'any key')
        }
    })

    onKeyRelease((key) => wait(0.1, () => {
        heldKeys.delete(key)
        heldKeys.delete("any")
    }))

    // log message if pressed only or held as well
    function pressedOrHeld(keys, string) {
        debug.log(`Pressed${keys.some(key => heldKeys.has(key)) ? ' and held' : ''} ${string}`)
        keys.forEach((key) => {
            if (key == "any" || isKeyDown(key)) heldKeys.add(key)
        })
    }


`since`v2000.0



[isKeyReleased](#isKeyReleased)(k?: Key | Key\[\]): boolean
===========================================================

If any or certain key(s) are just released last frame.

`param`k\- The key(s) to check.

    onUpdate(() => {
        if (!isKeyReleased()) return // early return as no key was released

        if (isKeyReleased("space")) debug.log("Released the jump key")
        if (isKeyReleased(["left", "right"])) debug.log("Released any of the move keys")
    })


`since`v2000.0



[isMouseDown](#isMouseDown)(btn?: MouseButton | MouseButton\[\]): boolean
=========================================================================

If mouse buttons are currently down.

`param`btn\- The button(s) to check.

`since`v2000.0



[isMousePressed](#isMousePressed)(btn?: MouseButton | MouseButton\[\]): boolean
===============================================================================

If mouse buttons are just clicked last frame

`param`btn\- The button(s) to check.

`since`v2000.0



[isMouseReleased](#isMouseReleased)(btn?: MouseButton | MouseButton\[\]): boolean
=================================================================================

If mouse buttons are just released last frame.

`param`btn\- The button(s) to check.

`since`v2000.0



[isMouseMoved](#isMouseMoved)(): boolean
========================================

If mouse moved last frame.

`since`v2000.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[isGamepadButtonPressed](#isGamepadButtonPressed)(btn?: KGamepadButton | KGamepadButton\[\]): boolean
=====================================================================================================

If certain gamepad buttons are just pressed last frame

`param`btn\- The button(s) to check.

`since`v3000.0



[isGamepadButtonDown](#isGamepadButtonDown)(btn?: KGamepadButton | KGamepadButton): boolean
===========================================================================================

If certain gamepad buttons are currently held down.

`param`btn\- The button(s) to check.

`since`v3000.0



[isGamepadButtonReleased](#isGamepadButtonReleased)(btn?: KGamepadButton | KGamepadButton\[\]): boolean
=======================================================================================================

If certain gamepad buttons are just released last frame.

`param`btn\- The button(s) to check.

`since`v3000.0



[isButtonPressed](#isButtonPressed)(btn?: TButton | TButton\[\]): boolean
=========================================================================

If any or certain bound button(s) are just pressed last frame on any input (keyboard, gamepad).

`param`btn\- The button(s) to check.

    onUpdate(() => {
        if (!isButtonPressed()) return // early return as no button was pressed

        if (isButtonPressed("jump")) debug.log("Player jumped")
        if (isButtonPressed(["left", "right"])) debug.log("Player moved")
    })


`since`v3001.0



[isButtonDown](#isButtonDown)(btn?: TButton | TButton\[\]): boolean
===================================================================

If any or certain bound button(s) are currently held down on any input (keyboard, gamepad).

`param`btn\- The button(s) to check.

    onUpdate(() => {
        if (!isButtonDown()) return // early return as no button is held down

        if (isButtonDown("jump")) debug.log("Player is jumping")
        if (isButtonDown(["left", "right"])) debug.log("Player is moving")
    })


`since`v3001.0



[isButtonReleased](#isButtonReleased)(btn?: TButton | TButton\[\]): boolean
===========================================================================

If any or certain bound button(s) are just released last frame on any input (keyboard, gamepad).

`param`btn\- The button(s) to check.

    onUpdate(() => {
        if (!isButtonReleased()) return // early return as no button was released

        if (isButtonReleased("jump")) debug.log("Player stopped jumping")
        if (isButtonReleased(["left", "right"])) debug.log("Player stopped moving")
    })


`since`v3001.0



[getButton](#getButton)(btn: TypeOperator): ButtonBinding
=========================================================

Get a input binding from a button name.

`param`btn\- The button to get binding for.

`since`v3001.0



[setButton](#setButton)(btn: string, def: ButtonBinding): void
==============================================================

Set a input binding for a button name.

`param`btn\- The button to set binding for.

`since`v3001.0



[pressButton](#pressButton)(btn: TButton): void
===============================================

Press a button virtually.

`param`btn\- The button to press.

    // press "jump" button
    pressButton("jump"); // triggers onButtonPress, starts onButtonDown
    releaseButton("jump"); // triggers onButtonRelease, stops onButtonDown


`since`v3001.0



[releaseButton](#releaseButton)(btn: TButton): void
===================================================

Release a button virtually.

`param`btn\- The button to release.

    // press "jump" button
    pressButton("jump"); // triggers onButtonPress, starts onButtonDown
    releaseButton("jump"); // triggers onButtonRelease, stops onButtonDown


`since`v3001.0



[getGamepadStick](#getGamepadStick)(stick: GamepadStick): Vec2
==============================================================

Get stick axis values from a gamepad.

`param`stick\- The stick to get values from.

`returns`The stick axis Vec2.

`since`v3001.0



[getLastInputDeviceType](#getLastInputDeviceType)(): ButtonBindingDevice | null
===============================================================================

Get the latest input device type that triggered the input event.

`returns`The last input device type, or null if no input event has been triggered.

`since`v3001.0



[charInputted](#charInputted)(): string\[\]
===========================================

List of characters inputted since last frame.

`returnns`An array of characters inputted.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Key](#Key): f1 | f2 | f3 | f4 | f5 | f6 | f7 | f8 | f9 | f10 | f11 | f12 | \` | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0 | \- | + | \= | q | w | e | r | t | y | u | i | o | p | \[ | \] | \\ | a | s | d | f | g | h | j | k | l | ; | ' | z | x | c | v | b | n | m | , | . | / | escape | backspace | enter | tab | control | alt | meta | space | | left | right | up | down | shift | string &
=================================================================================================================================================================================================================================================================================================================================================================================================

A key.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[MouseButton](#MouseButton): left | right | middle | back | forward
===================================================================

A mouse button.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[KGamepadButton](#KGamepadButton): north | east | south | west | ltrigger | rtrigger | lshoulder | rshoulder | select | start | lstick | rstick | dpad-up | dpad-right | dpad-down | dpad-left | home | capture
===============================================================================================================================================================================================================

A gamepad button.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[GamepadStick](#GamepadStick): left | right
===========================================

A gamepad stick.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[KEventController](#KEventController):
======================================

A controller for all events in KAPLAY.

    // Create a new event
    const logHi = onUpdate(() => {
       debug.log("hi");
    });

    // Pause the event
    logHi.paused = true;

    // Cancel the event
    logHi.cancel();



[paused](#KEventController-paused): boolean
===========================================

If the event is paused

[cancel](#KEventController-cancel)(): void
==========================================

Cancel the event

[join](#KEventController-join)(events: KEventController\[\]): KEventController
==============================================================================

[replace](#KEventController-replace)(oldEv: KEventController, newEv: KEventController): KEventController
========================================================================================================



[GameObjEventMap](#GameObjEventMap):
====================================

Game Object events with their arguments. If looking for use it with \`obj.on()\`, ignore first parameter (Game Obj)

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[trigger](#trigger)(event: string, tag: string, args: any): void
================================================================

Trigger an event on all game objs with certain tag.

`param`event\- The tag to trigger to.

`param`tag\- Arguments to pass to the \`on()\` functions

    trigger("shoot", "target", 140);

    on("shoot", "target", (obj, score) => {
        obj.destroy();
        debug.log(140); // every bomb was 140 score points!
    });


`since`v3001.0.6

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[on](#on)<Ev\>(event: Ev, tag: Tag, action: (obj: GameObj, args: TupleWithoutFirst)\=>void): KEventController
=============================================================================================================

Register an event on all game objs with certain tag.

`param`event\- The tag to listen for.

`param`tag\- The function to run when the event is triggered.

    // a custom event defined by body() comp
    // every time an obj with tag "bomb" hits the floor, destroy it and addKaboom()
    on("ground", "bomb", (bomb) => {
        destroy(bomb)
        addKaboom(bomb.pos)
    })

    // a custom event can be defined manually
    // by passing an event name, a tag, and a callback function
    // if you want any tag, use a tag of "*"
    on("talk", "npc", (npc, message) => {
        npc.add([
            text(message),
            pos(0, -50),
            lifespan(2),
            opacity(),
        ])
    });

    onKeyPress("space", () => {
        // the trigger method on game objs can be used to trigger a custom event
        npc.trigger("talk", "Hello, KAPLAY!");
    });



`returns`The event controller.

`since`v2000.0



[onFixedUpdate](#onFixedUpdate)(action: ()\=>void): KEventController
====================================================================

Register an event that runs at a fixed framerate.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3001.0



[onFixedUpdate](#onFixedUpdate)(tag: Tag, action: (obj: GameObj)\=>void): KEventController
==========================================================================================



[onUpdate](#onUpdate)(tag: Tag, action: (obj: GameObj)\=>void): KEventController
================================================================================

Register an event that runs every frame (~60 times per second) for all game objs with certain tag.

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

    // move every "tree" 120 pixels per second to the left, destroy it when it leaves screen
    // there'll be nothing to run if there's no "tree" obj in the scene
    onUpdate("tree", (tree) => {
        tree.move(-120, 0)
        if (tree.pos.x < 0) {
            destroy(tree)
        }
    })


`returns`The event controller.

`since`v2000.1



[onUpdate](#onUpdate)(action: ()\=>void): KEventController
==========================================================

Register an event that runs every frame (~60 times per second).

`param`action\- The function to run when the event is triggered.

    // This will run every frame
    onUpdate(() => {
        debug.log("ohhi")
    })


`returns`The event controller.

`since`v2000.1



[onDraw](#onDraw)(tag: Tag, action: (obj: GameObj)\=>void): KEventController
============================================================================

Register an event that runs every frame (~60 times per second) for all game objs with certain tag (this is the same as onUpdate but all draw events are run after update events, drawXXX() functions only work in this phase).

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v2000.1



[onDraw](#onDraw)(action: ()\=>void): KEventController
======================================================

Register an event that runs every frame (~60 times per second) (this is the same as onUpdate but all draw events are run after update events, drawXXX() functions only work in this phase).

    onDraw(() => {
        drawLine({
            p1: vec2(0),
            p2: mousePos(),
            color: rgb(0, 0, 255),
        })
    })


`returns`The event controller.

`since`v2000.1



[onAdd](#onAdd)(tag: Tag, action: (obj: GameObj)\=>void): KEventController
==========================================================================

Register an event that runs when an object with the provided tag is added.

`param`tag\- The tag to listen for.

`param`action\- The function that runs when an object is added.

    // This will run when the object is added.
    onAdd("player", () => {
        debug.log("ohhi");
    });

    add([
        pos(),
        "player"
    ]);


`returns`The event controller.

`since`v2000.0



[onAdd](#onAdd)(action: (obj: GameObj)\=>void): KEventController
================================================================

Register an event that runs when an object is added

`param`action\- The tag to match, only called for objects with a matching tag.

`param`unknown\- The function that runs when an object is added.

    // This will run when the object is added.
    onAdd(() => {
        debug.log("ohhi");
    });

    add([
        pos(),
    ]);


`returns`The event controller.

`since`v2000.0



[onDestroy](#onDestroy)(tag: Tag, action: (obj: GameObj)\=>void): KEventController
==================================================================================

Register an event that runs when an object with the provided tag is destroyed.

`param`tag\- The function that runs when an object is destroyed.

    // This will run when the tagged object is destroyed.
    onDestroy("bean", () => {
        debug.log("ohbye");
    });

    let player = add([
        pos(),
        "bean"
    ])

    // Destroy the tagged object
    destroy(player);


`returns`The event controller.

`since`v2000.0



[onDestroy](#onDestroy)(action: (obj: GameObj)\=>void): KEventController
========================================================================

Register an event that runs when an object is destroyed.

`param`action\- The tag to match, only called for objects with a matching tag.

`param`unknown\- The function that runs when an object is destroyed.

    // This will run when the object is destroyed.
    onDestroy(() => {
        debug.log("ohbye");
    });

    let ghosty = add([
        pos(),
    ]);

    // Destroy the object
    destroy(ghosty);


`returns`The event controller.



[onUse](#onUse)(action: (obj: GameObj, id: string)\=>void): KEventController
============================================================================

Register an event that runs when an object starts using a component.

`param`action\- The function that runs when an object starts using component.

`param`unknown\- The id of the component that was added.

`returns`The event controller.

`since`v3001.1



[onUnuse](#onUnuse)(action: (obj: GameObj, id: string)\=>void): KEventController
================================================================================

Register an event that runs when an object stops using a component.

`param`action\- The function that runs when an object stops using a component.

`param`unknown\- The id of the component that was removed.d

`returns`The event controller.

`since`v3001.1



[onTag](#onTag)(action: (obj: GameObj, tag: string)\=>void): KEventController
=============================================================================

Register an event that runs when an object gains a tag.

`param`action\- The function that runs when an object gains a tag.

`param`unknown\- The tag which was added.

`returns`The event controller.

`since`v3001.1



[onUntag](#onUntag)(action: (obj: GameObj, tag: string)\=>void): KEventController
=================================================================================

Register an event that runs when an object loses a tag.

`param`action\- The function that runs when an object loses a tag.

`param`unknown\- The tag which was removed.

`returns`The event controller.

`since`v3001.1



[onLoad](#onLoad)(action: ()\=>void): KEventController | undefined
==================================================================

Register an event that runs when all assets finished loading.

`param`action\- The function to run when the event is triggered.

    const bean = add([
        sprite("bean"),
    ]);

    // certain assets related data are only available when the game finishes loading
    onLoad(() => {
        debug.log(bean.width)
    });


`returns`The event controller.

`since`v2000.1



[onLoadError](#onLoadError)(action: (name: string, failedAsset: Asset)\=>void): KEventController | undefined
============================================================================================================

Register an event that runs once for each asset that failed to load, after all others have completed.

`param`actionThe function to run when the event is triggered.

    // this will not load
    loadSprite("bobo", "notavalidURL");

    // process the error
    // you decide whether to ignore it, or throw an error and halt the game
    onLoadError((name, asset) => {
        debug.error(`${name} failed to load: ${asset.error}`);
    });


`returns`The event controller.

`since`v3001.0



[onLoading](#onLoading)(action: (progress: number)\=>void): KEventController
============================================================================

Register an event that runs every frame when assets are initially loading. Can be used to draw a custom loading screen.

`param`action\- The function that runs when assets are loading.

    ```
    // progress bar
    onLoading((progress) => {
        // Background of the bar
        drawRect({
            width: 240,
            height: 40,
            pos: center().add(-120,0),
            color: BLACK,
            anchor: `left,
        });
        // Progress of the bar
        drawRect({
            width: map(progress, 0, 1, 0, 220),
            height: 32,
            pos: center().add(-116, 0),
            color: BLUE,
            anchor: `left
        });
    });


`returns`The event controller.

`since`v3000.0



[onError](#onError)(action: (err: Error)\=>void): KEventController
==================================================================

Register a custom error handler. Can be used to draw a custom error screen.

`param`action\- The function that runs when the program errors.

    // Create custom error handler
    onError((err) => {
        drawRect({
            width: width(),
            height: height(),
            pos: center(),
            color: RED,
            anchor: `center,
        });

        drawText({
            text: err.message,
            size: 48,
            width: width()/2,
            anchor: `center`,
            align: `center`,
            pos: center(),
            color: BLACK
        });
    });

    // cause common error
    let pos = add([
        pos()
    ]);


`returns`The event controller.

`since`v3000.0



[onResize](#onResize)(action: ()\=>void): KEventController
==========================================================

Register an event that runs when the canvas resizes.

`param`action\- The function that runs when the canvas resizes.

    // create a rectangle with screen size
    let rectangle = add([
        rect(width(), height()),
        color(GREEN),
    ]);

    // resize the rectangle to screen size
    onResize(() => {
        debug.log(`Old Size: ${rectangle.width}x${rectangle.height}`);
        rectangle.width = width();
        rectangle.height = height();
        debug.log(`New Size: ${rectangle.width}x${rectangle.height}`);
    });


`returns`The event controller.

`since`v3000.0



[onCleanup](#onCleanup)(action: ()\=>void): void
================================================

Cleanup function to run when quit() is called.

`param`action\- The function that runs when quit() is called.

    // useful externally from KAPLAY
    onCleanup(() => {
        console.log(`ohbye :(`);
    });

    quit();


`returns`The event controller.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[onCollide](#onCollide)(t1: Tag, t2: Tag, action: (a: GameObj, b: GameObj, col?: Collision)\=>void): KEventController
=====================================================================================================================

Register an event that runs once when 2 game objs with certain tags collides (required to have area() component).

`param`t1\- The tag of the first game obj.

`param`t2\- The tag of the second game obj.

`param`action\- The function to run when the event is triggered.

    onCollide("sun", "earth", () => {
        addExplosion()
    })


`returns`The event controller.

`since`v2000.1



[onCollideUpdate](#onCollideUpdate)(t1: Tag, t2: Tag, action: (a: GameObj, b: GameObj, col?: Collision)\=>void): KEventController
=================================================================================================================================

Register an event that runs every frame when 2 game objs with certain tags collides (required to have area() component).

`param`t1\- The tag of the first game obj.

`param`t2\- The tag of the second game obj.

`param`action\- The function to run when the event is triggered.

    onCollideUpdate("sun", "earth", () => {
        debug.log("okay this is so hot");
    })l


`returns`The event controller.

`since`v3000.0



[onHover](#onHover)(tag: Tag, action: (a: GameObj)\=>void): KEventController
============================================================================

Register an event that runs once when game objs with certain tags are hovered (required to have area() component).

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3000.0



[onHoverUpdate](#onHoverUpdate)(tag: Tag, action: (a: GameObj)\=>void): KEventController
========================================================================================

Register an event that runs every frame when game objs with certain tags are hovered (required to have area() component).

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

    // Rotate bean 90 degrees per second when hovered
    onHoverUpdate("bean", (bean) => {
      bean.angle += dt() * 90
    });


`returns`The event controller.

`since`v3000.0



[onHoverEnd](#onHoverEnd)(tag: Tag, action: (a: GameObj)\=>void): KEventController
==================================================================================

Register an event that runs once when game objs with certain tags are unhovered (required to have area() component).

`param`tag\- The tag to listen for.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3000.0



[onHide](#onHide)(action: ()\=>void): KEventController
======================================================

Register an event that runs when tab is hidden.

`param`action\- The function that is run what the tab is hidden.

    // spooky ghost
    let ghosty = add([
        pos(center()),
        sprite("ghosty"),
        anchor("center"),
    ]);

    // when switching tabs, this runs
    onHide(() => {
        destroy(ghosty);
        add([
            text("There was never aa ghosttttt"),
            pos(center()),
            anchor("center")
        ]);
    });


`returns`The event controller.

`since`v3001.0



[onShow](#onShow)(action: ()\=>void): KEventController
======================================================

Register an event that runs when tab is shown.

`param`action\- The function that is run when the tab is shown.

    // user has returned to this tab
    onShow(() => {
        burp();
    });


`returns`The event controller.

`since`v3001.0



[onSceneLeave](#onSceneLeave)(action: (newScene?: string)\=>void): KEventController
===================================================================================

Register an event that runs when current scene ends.

`param`action\- The function to run when the event is triggered.

`returns`The event controller.

`since`v3000.0



[KEvent](#KEvent)<Args\>:
=========================

[cancellers](#KEvent-cancellers):
=================================

[handlers](#KEvent-handlers):
=============================

[add](#KEvent-add)(action: (args: Args)\=>unknown): KEventController
====================================================================

[addOnce](#KEvent-addOnce)(action: (args: Args | PromiseLike\[\])\=>void): KEventController
===========================================================================================

[next](#KEvent-next)(): Promise<Args\>
======================================

[trigger](#KEvent-trigger)(args: Args): void
============================================

[numListeners](#KEvent-numListeners)(): number
==============================================

[clear](#KEvent-clear)(): void
==============================



[KEventHandler](#KEventHandler)<EventMap\>:
===========================================

[handlers](#KEventHandler-handlers):
====================================

[registers](#KEventHandler-registers): Partial<MappedType\>
===========================================================

[on](#KEventHandler-on)<Name\>(name: Name, action: (args: EventMap\[Name\])\=>void): KEventController
=====================================================================================================

[onOnce](#KEventHandler-onOnce)<Name\>(name: Name, action: (args: EventMap\[Name\])\=>void): KEventController
=============================================================================================================

[next](#KEventHandler-next)<Name\>(name: Name): Promise<unknown\>
=================================================================

[trigger](#KEventHandler-trigger)<Name\>(name: Name, args: EventMap\[Name\]): void
==================================================================================

[remove](#KEventHandler-remove)<Name\>(name: Name): void
========================================================

[clear](#KEventHandler-clear)(): void
=====================================

[numListeners](#KEventHandler-numListeners)<Name\>(name: Name): number
======================================================================



[KEventController](#KEventController):
======================================

A controller for all events in KAPLAY.

    // Create a new event
    const logHi = onUpdate(() => {
       debug.log("hi");
    });

    // Pause the event
    logHi.paused = true;

    // Cancel the event
    logHi.cancel();



[paused](#KEventController-paused): boolean
===========================================

If the event is paused

[cancel](#KEventController-cancel)(): void
==========================================

Cancel the event

[join](#KEventController-join)(events: KEventController\[\]): KEventController
==============================================================================

[replace](#KEventController-replace)(oldEv: KEventController, newEv: KEventController): KEventController
========================================================================================================



[cancel](#cancel)(): Symbol
===========================

Cancels the event by returning the cancel symbol.

    onKeyPress((key) => {
        if (key === "q") return cancel();
    });


`returns`The cancel event symbol.

`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1.0



[width](#width)(): number
=========================

Get the width of game.

`returns`The width of the game.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getTreeRoot](#getTreeRoot)(): GameObj
======================================

Get the root of all objects.

`returns`The root object.

`since`v2000.0



[height](#height)(): number
===========================

Get the height of game.

`returns`The height of the game.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[center](#center)(): Vec2
=========================

Get the center point of view.

    // add bean to the center of the screen
    add([
        sprite("bean"),
        pos(center()),
        // ...
    ])


`returns`The center point of the view.

`since`v2000.0



[dt](#dt)(): number
===================

Get the delta time since last frame.

    // rotate bean 100 deg per second
    bean.onUpdate(() => {
        bean.angle += 100 * dt()
    })


`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[fixedDt](#fixedDt)(): number
=============================

Get the fixed delta time since last frame.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[restDt](#restDt)(): number
===========================

Get the rest delta time since last frame.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[time](#time)(): number
=======================

Get the total time since beginning.

`since`v3001

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[isFocused](#isFocused)(): boolean
==================================

If the game canvas is currently focused.

`returns`true if focused.

`since`v2000.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setBackground](#setBackground)(color: Color): void
===================================================

Set background color.

`since`v3000.0



[setBackground](#setBackground)(color: Color, alpha: number): void
==================================================================



[setBackground](#setBackground)(r: number, g: number, b: number): void
======================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setBackground](#setBackground)(r: number, g: number, b: number, alpha: number): void
=====================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getBackground](#getBackground)(): Color | null
===============================================

Get background color.

`returns`The background color.

`since`v3000.0



[getGamepads](#getGamepads)(): KGamepad\[\]
===========================================

Get connected gamepads.

`returns`An array of connected gamepads.

`since`v3000.0



[setCursor](#setCursor)(style: Cursor): void
============================================

Set cursor style.

`param`style\- The cursor style.

    // Change between cursor styles

    // Reset cursor to default at start of every frame
    onUpdate(() => setCursor("default"));

    button.onHover((c) => {
       // change cursor to pointer when hovering over button
        setCursor("pointer")
    })

    // Hide the only cursor at start (useful for fakeMouse)
    setCursor("none");


`since`v2000.0



[getCursor](#getCursor)(): Cursor
=================================

Get current cursor style.

`returns`The current cursor style.

`since`v2000.0



[setCursorLocked](#setCursorLocked)(locked: boolean): void
==========================================================

Lock / unlock cursor. Note that you cannot lock cursor within 1 second after user unlocking the cursor with the default unlock gesture (typically the esc key) due to browser policy.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[isCursorLocked](#isCursorLocked)(): boolean
============================================

Get if cursor is currently locked.

`returns`true if locked, false otherwise.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setFullscreen](#setFullscreen)(f?: boolean): void
==================================================

Enter / exit fullscreen mode. (note: mouse position is not working in fullscreen mode at the moment)

    // toggle fullscreen mode on "f"
    onKeyPress("f", (c) => {
        setFullscreen(!isFullscreen());
    });


`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[isFullscreen](#isFullscreen)(): boolean
========================================

If currently in fullscreen mode.

`returns`true if fullscreen, false otherwise.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[canvas](#canvas): HTMLCanvasElement
====================================

The canvas DOM KAPLAY is currently using.

`since`v2000.0



[VERSION](#VERSION): string
===========================

Current KAPLAY library version.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[wait](#wait)(n: number, action?: ()\=>void): TimerController
=============================================================

Run the function after n seconds.

`param`n\- The time to wait in seconds.

`param`action\- The function to run.

    // 3 seconds until explosion! Runnn!
    wait(3, () => {
        explode()
    })

    // wait() returns a PromiseLike that can be used with await
    await wait(1)


`returns`A timer controller.

`since`v2000.0



[loop](#loop)(t: number, action: ()\=>void, maxLoops?: number, waitFirst?: boolean): TimerController
====================================================================================================

Run the function every n seconds.

`param`t\- The time to wait in seconds.

`param`action\- The function to run.

`param`maxLoops\- The maximum number of loops to run. If not provided, it will run forever.

`param`waitFirst\- Whether to wait for the first loop to start.

    // spawn a butterfly at random position every 1 second
    loop(1, () => {
        add([
            sprite("butterfly"),
            pos(rand(vec2(width(), height()))),
            area(),
            "friend",
        ])
    })


`returns`A timer controller.

`since`v2000.0



[TimerController](#TimerController):

[paused](#undefined-paused): boolean
====================================

If the event handler is paused.

[cancel](#undefined-cancel)(): void
===================================

Cancel the event handler.

[onEnd](#undefined-onEnd)(action: ()\=>void): void
==================================================

Register an event when finished.

[then](#undefined-then)(action: ()\=>void): TimerController
===========================================================




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[TweenController](#TweenController): TimerController &

[finish](#undefined-finish)(): void
===================================

Finish the tween now and cancel.




=====================================================================================================================================================================

Event controller for tween.



[Color](#Color):
================

0-255 RGBA color.

[r](#Color-r): number
=====================

Red (0-255.

[g](#Color-g): number
=====================

Green (0-255).

[b](#Color-b): number
=====================

Blue (0-255).

[fromArray](#Color-fromArray)(arr: number\[\]): Color
=====================================================

[fromHex](#Color-fromHex)(hex: string | number): Color
======================================================

Create color from hex string or literal.

    Color.fromHex(0xfcef8d)
    Color.fromHex("#5ba675")
    Color.fromHex("d46eb3")


`since`v3000.0

[fromHSL](#Color-fromHSL)(h: number, s: number, l: number): Color
=================================================================

[RED](#Color-RED): Color
========================

[GREEN](#Color-GREEN): Color
============================

[BLUE](#Color-BLUE): Color
==========================

[YELLOW](#Color-YELLOW): Color
==============================

[MAGENTA](#Color-MAGENTA): Color
================================

[CYAN](#Color-CYAN): Color
==========================

[WHITE](#Color-WHITE): Color
============================

[BLACK](#Color-BLACK): Color
============================

[clone](#Color-clone)(): Color
==============================

[lighten](#Color-lighten)(a: number): Color
===========================================

Lighten the color (adds RGB by n).

[darken](#Color-darken)(a: number): Color
=========================================

Darkens the color (subtracts RGB by n).

[invert](#Color-invert)(): Color
================================

[mult](#Color-mult)(other: Color): Color
========================================

[lerp](#Color-lerp)(dest: Color, t: number): Color
==================================================

Linear interpolate to a destination color.

`since`v3000.0

[toHSL](#Color-toHSL)(): \[number, number, number\]
===================================================

Convert color into HSL format.

`since`v3001.0

[eq](#Color-eq)(other: Color): boolean
======================================

[toHex](#Color-toHex)(): string
===============================

Return the hex string of color.

`since`v3000.0

[toArray](#Color-toArray)(): Array<number\>
===========================================

Return the color converted to an array.

`since`v3001.0



[Vec2Args](#Vec2Args): \[number, number\] | \[number\] | \[Vec2\] | \[number | Vec2\] | \[\]
============================================================================================

Possible arguments for a Vec2.



[Vec2](#Vec2):
==============

A 2D vector.

[x](#Vec2-x): number
====================

The x coordinate

[y](#Vec2-y): number
====================

The y coordinate

[fromAngle](#Vec2-fromAngle)(deg: number): Vec2
===============================================

Create a new Vec2 from an angle in degrees

[fromArray](#Vec2-fromArray)(arr: Array): Vec2
==============================================

Create a new Vec2 from an array

[ZERO](#Vec2-ZERO): Vec2
========================

An empty vector. (0, 0)

[ONE](#Vec2-ONE): Vec2
======================

A vector with both components of 1. (1, 1)

[LEFT](#Vec2-LEFT): Vec2
========================

A vector signaling to the left. (-1, 0)

[RIGHT](#Vec2-RIGHT): Vec2
==========================

A vector signaling to the right. (1, 0)

[UP](#Vec2-UP): Vec2
====================

A vector signaling up. (0, -1)

[DOWN](#Vec2-DOWN): Vec2
========================

A vector signaling down. (0, 1)

[toAxis](#Vec2-toAxis)(): Vec2
==============================

Closest orthogonal direction: LEFT, RIGHT, UP, or DOWN

[clone](#Vec2-clone)(): Vec2
============================

Clone the vector

[copy](#Vec2-copy)(v: Vec2, out: Vec2): Vec2
============================================

[add](#Vec2-add)(args: Vec2Args): Vec2
======================================

Returns the sum with another vector.

[add](#Vec2-add)(v: Vec2, other: Vec2, out: Vec2): Vec2
=======================================================

Calculates the sum of the vectors

`param`vThe first term

`param`otherThe second term

`param`outThe vector sum

`returns`The sum of the vectors

[addScaled](#Vec2-addScaled)(v: Vec2, other: Vec2, s: number, out: Vec2): Vec2
==============================================================================

[addc](#Vec2-addc)(v: Vec2, x: number, y: number, out: Vec2): Vec2
==================================================================

Calculates the sum of the vectors

`param`vThe first term

`param`xThe x of the second term

`param`yThe y of the second term

`param`outThe vector sum

`returns`The sum of the vectors

[sub](#Vec2-sub)(args: Vec2Args): Vec2
======================================

Returns the difference with another vector.

[sub](#Vec2-sub)(v: Vec2, other: Vec2, out: Vec2): Vec2
=======================================================

Calculates the difference of the vectors

`param`vThe first term

`param`otherThe second term

`param`outThe vector difference

`returns`The difference of the vectors

[subc](#Vec2-subc)(v: Vec2, x: number, y: number, out: Vec2): Vec2
==================================================================

Calculates the difference of the vectors

`param`vThe first term

`param`xThe x of the second term

`param`yThe y of the second term

`param`outThe vector difference

`returns`The difference of the vectors

[scale](#Vec2-scale)(args: Vec2Args): Vec2
==========================================

Scale by another vector. or a single number

[scale](#Vec2-scale)(v: Vec2, s: number, out: Vec2): Vec2
=========================================================

Calculates the scale of the vector

`param`vThe vector

`param`sThe x scale

`param`outThe y scale

`param`unknownThe scaled vector

`returns`The scale of the vector

[scalec](#Vec2-scalec)(v: Vec2, x: number, y: number, out: Vec2): Vec2
======================================================================

Calculates the scale of the vector

`param`vThe vector

`param`xThe x scale

`param`yThe y scale

`param`outThe scaled vector

`returns`The scale of the vector

[scalev](#Vec2-scalev)(v: Vec2, other: Vec2, out: Vec2): Vec2
=============================================================

Calculates the scale of the vector

`param`vThe vector

`param`otherThe scale

`param`outThe scaled vector

`returns`The scale of the vector

[invScale](#Vec2-invScale)(args: Vec2Args): Vec2
================================================

Scale by the inverse of another vector. or a single number

[dist](#Vec2-dist)(args: Vec2Args): number
==========================================

Get distance between another vector

[dist](#Vec2-dist)(v: Vec2, other: Vec2): number
================================================

Calculates the distance between the vectors

`param`vThe vector

`param`otherThe other vector

`returns`The between the vectors

[sdist](#Vec2-sdist)(args: Vec2Args): number
============================================

Get squared distance between another vector

[sdist](#Vec2-sdist)(v: Vec2, other: Vec2): number
==================================================

Calculates the squared distance between the vectors

`param`vThe vector

`param`otherThe other vector

`returns`The distance between the vectors

[len](#Vec2-len)(): number
==========================

Get length of the vector

`since`v3000.0

[len](#Vec2-len)(v: Vec2): number
=================================

Calculates the length of the vector

`param`vThe vector

`returns`The length of the vector

[slen](#Vec2-slen)(): number
============================

Get squared length of the vector

`since`v3000.0

[slen](#Vec2-slen)(v: Vec2): number
===================================

Calculates the squared length of the vector

`param`vThe vector

`returns`The squared length of the vector

[unit](#Vec2-unit)(): Vec2
==========================

Get the unit vector (length of 1).

[unit](#Vec2-unit)(v: Vec2, out: Vec2): Vec2
============================================

[normal](#Vec2-normal)(): Vec2
==============================

Get the perpendicular vector.

[normal](#Vec2-normal)(v: Vec2, out: Vec2): Vec2
================================================

[reflect](#Vec2-reflect)(normal: Vec2): Vec2
============================================

Get the reflection of a vector with a normal.

`since`v3000.0

[project](#Vec2-project)(on: Vec2): Vec2
========================================

Get the projection of a vector onto another vector.

`since`v3000.0

[reject](#Vec2-reject)(on: Vec2): Vec2
======================================

Get the rejection of a vector onto another vector.

`since`v3000.0

[rotate](#Vec2-rotate)(vecOrAngle: Vec2 | number): Vec2
=======================================================

[rotate](#Vec2-rotate)(v: Vec2, dir: Vec2, out: Vec2): Vec2
===========================================================

Calculates the rotated vector

`param`vThe vector

`param`dirThe rotation vector

`param`outThe rotated vector

`returns`The rotated vector

[rotateByAngle](#Vec2-rotateByAngle)(v: Vec2, angle: number, out: Vec2): Vec2
=============================================================================

Calculates the rotated vector

`param`vThe vector

`param`angleThe angle in radians

`param`outThe rotated vector

`returns`The rotated vector

[invRotate](#Vec2-invRotate)(vecOrAngle: Vec2 | number): Vec2
=============================================================

[inverseRotate](#Vec2-inverseRotate)(v: Vec2, dir: Vec2, out: Vec2): Vec2
=========================================================================

Calculates the inverse rotated vector

`param`vThe vector

`param`dirThe rotation vector

`param`outThe rotated vector

`returns`The rotated vector

[dot](#Vec2-dot)(p2: Vec2): number
==================================

Get the dot product with another vector.

[dot](#Vec2-dot)(v: Vec2, other: Vec2): number
==============================================

Get the dot product between 2 vectors.

`since`v3000.0

[cross](#Vec2-cross)(p2: Vec2): number
======================================

Get the cross product with another vector.

`since`v3000.0

[cross](#Vec2-cross)(v: Vec2, other: Vec2): number
==================================================

Get the cross product between 2 vectors.

`since`v3000.0

[angle](#Vec2-angle)(args: Vec2Args): number
============================================

Get the angle of the vector in degrees.

[toAngle](#Vec2-toAngle)(v: Vec2): number
=========================================

Calculates the angle represented by the vector in radians

`param`vThe vector

`returns`Angle represented by the vector in radians

[angleBetween](#Vec2-angleBetween)(args: Vec2Args): number
==========================================================

Get the angle between this vector and another vector.

`since`v3000.0

[angleBetween](#Vec2-angleBetween)(v: Vec2, other: Vec2): number
================================================================

Calculates the angle between the vectors in radians

`param`vFirst vector

`param`otherSecond vector

`returns`Angle between the vectors in radians

[lerp](#Vec2-lerp)(dest: Vec2, t: number): Vec2
===============================================

Linear interpolate to a destination vector (for positions).

[lerp](#Vec2-lerp)(src: Vec2, dst: Vec2, t: number, out: Vec2): Vec2
====================================================================

Linear interpolate src and dst by t

`param`srcFirst vector

`param`dstSecond vector

`param`tPercentage

`param`outThe linear interpolation between src and dst by t

`returns`The linear interpolation between src and dst by t

[slerp](#Vec2-slerp)(dest: Vec2, t: number): Vec2
=================================================

Spherical linear interpolate to a destination vector (for rotations).

`since`v3000.0

[slerp](#Vec2-slerp)(src: Vec2, dst: Vec2, t: number, out: Vec2): Vec2
======================================================================

Spherical interpolate src and dst by t

`param`srcFirst vector

`param`dstSecond vector

`param`tPercentage

`param`outThe spherical interpolation between src and dst by t

`returns`The spherical interpolation between src and dst by t

[isZero](#Vec2-isZero)(): boolean
=================================

If the vector (x, y) is zero.

`since`v3000.0

[toFixed](#Vec2-toFixed)(n: number): Vec2
=========================================

To n precision floating point.

[transform](#Vec2-transform)(m: Mat4): Vec2
===========================================

Multiply by a Mat4.

`since`v3000.0

[eq](#Vec2-eq)(other: Vec2): boolean
====================================

See if one vector is equal to another.

`since`v3000.0

[bbox](#Vec2-bbox)(): Rect
==========================

Converts the vector to a Rect`Rect()` with the vector as the origin.

`since`v3000.0.

[toArray](#Vec2-toArray)(): Array<number\>
==========================================

Converts the vector to an array.

`since`v3001.0



[Quad](#Quad):
==============

[x](#Quad-x): number
====================

[y](#Quad-y): number
====================

[w](#Quad-w): number
====================

[h](#Quad-h): number
====================

[scale](#Quad-scale)(other: Quad): Quad
=======================================

[pos](#Quad-pos)(): Vec2
========================

[clone](#Quad-clone)(): Quad
============================

[eq](#Quad-eq)(other: Quad): boolean
====================================



[Mat4](#Mat4):
==============

[m](#Mat4-m): number\[\]
========================

[translate](#Mat4-translate)(p: Vec2): Mat4
===========================================

[translate](#Mat4-translate)(p: Vec2): this
===========================================

[scale](#Mat4-scale)(s: Vec2): Mat4
===================================

[scale](#Mat4-scale)(p: Vec2): this
===================================

[rotateX](#Mat4-rotateX)(a: number): Mat4
=========================================

[rotateY](#Mat4-rotateY)(a: number): Mat4
=========================================

[rotateZ](#Mat4-rotateZ)(a: number): Mat4
=========================================

[rotate](#Mat4-rotate)(a: number): Mat4
=======================================

[mult](#Mat4-mult)(other: Mat4): Mat4
=====================================

[multVec2](#Mat4-multVec2)(p: Vec2): Vec2
=========================================

[getTranslation](#Mat4-getTranslation)(): Vec2
==============================================

[getScale](#Mat4-getScale)(): Vec2
==================================

[getRotation](#Mat4-getRotation)(): number
==========================================

[getSkew](#Mat4-getSkew)(): Vec2
================================

[invert](#Mat4-invert)(): Mat4
==============================

[clone](#Mat4-clone)(): Mat4
============================



[RNG](#RNG):
============

[seed](#RNG-seed): number
=========================

[gen](#RNG-gen)(): number
=========================

[genNumber](#RNG-genNumber)(a: number, b: number): number
=========================================================

[genVec2](#RNG-genVec2)(a: Vec2, b: Vec2): Vec2
===============================================

[genColor](#RNG-genColor)(a: Color, b: Color): Color
====================================================

[genAny](#RNG-genAny)<T\>(args: \[\] | \[T\] | \[T, T\]): T
===========================================================



[ShapeType](#ShapeType): Point | Circle | Line | Rect | Polygon | Ellipse
=========================================================================



[RaycastHit](#RaycastHit):

[fraction](#undefined-fraction): number
=======================================

[normal](#undefined-normal): Vec2
=================================

[point](#undefined-point): Vec2
===============================

[gridPos](#undefined-gridPos)?: Vec2
====================================

[object](#undefined-object)?: GameObj
=====================================




=============================================================================================================================================================================================================================================================================================================================================================================================================



[RaycastResult](#RaycastResult): RaycastHit | null
==================================================



[Line](#Line):
==============

[p1](#Line-p1): Vec2
====================

[p2](#Line-p2): Vec2
====================

[transform](#Line-transform)(m: Mat23): Line
============================================

[bbox](#Line-bbox)(): Rect
==========================

[area](#Line-area)(): number
============================

[clone](#Line-clone)(): Line
============================

[collides](#Line-collides)(shape: ShapeType | Vec2): boolean
============================================================

[contains](#Line-contains)(point: Vec2): boolean
================================================

[raycast](#Line-raycast)(origin: Vec2, direction: Vec2): RaycastResult
======================================================================

[random](#Line-random)(): Vec2
==============================



[Rect](#Rect):
==============

[pos](#Rect-pos): Vec2
======================

[width](#Rect-width): number
============================

[height](#Rect-height): number
==============================

[fromPoints](#Rect-fromPoints)(p1: Vec2, p2: Vec2): Rect
========================================================

[center](#Rect-center)(): Vec2
==============================

[points](#Rect-points)(): \[Vec2, Vec2, Vec2, Vec2\]
====================================================

[transform](#Rect-transform)(m: Mat23): Polygon
===============================================

[bbox](#Rect-bbox)(): Rect
==========================

[area](#Rect-area)(): number
============================

[clone](#Rect-clone)(): Rect
============================

[distToPoint](#Rect-distToPoint)(p: Vec2): number
=================================================

[sdistToPoint](#Rect-sdistToPoint)(p: Vec2): number
===================================================

[collides](#Rect-collides)(shape: ShapeType | Vec2): boolean
============================================================

[contains](#Rect-contains)(point: Vec2): boolean
================================================

[raycast](#Rect-raycast)(origin: Vec2, direction: Vec2): RaycastResult
======================================================================

[random](#Rect-random)(): Vec2
==============================



[Circle](#Circle):
==================

[center](#Circle-center): Vec2
==============================

[radius](#Circle-radius): number
================================

[transform](#Circle-transform)(tr: Mat23): Ellipse
==================================================

[bbox](#Circle-bbox)(): Rect
============================

[area](#Circle-area)(): number
==============================

[clone](#Circle-clone)(): Circle
================================

[collides](#Circle-collides)(shape: ShapeType | Vec2): boolean
==============================================================

[contains](#Circle-contains)(point: Vec2): boolean
==================================================

[raycast](#Circle-raycast)(origin: Vec2, direction: Vec2): RaycastResult
========================================================================

[random](#Circle-random)(): Vec2
================================



[Ellipse](#Ellipse):
====================

[center](#Ellipse-center): Vec2
===============================

[radiusX](#Ellipse-radiusX): number
===================================

[radiusY](#Ellipse-radiusY): number
===================================

[angle](#Ellipse-angle): number
===============================

[fromMat2](#Ellipse-fromMat2)(tr: Mat2): Ellipse
================================================

[toMat2](#Ellipse-toMat2)(): Mat2
=================================

[transform](#Ellipse-transform)(tr: Mat23): Ellipse
===================================================

[bbox](#Ellipse-bbox)(): Rect
=============================

[area](#Ellipse-area)(): number
===============================

[clone](#Ellipse-clone)(): Ellipse
==================================

[collides](#Ellipse-collides)(shape: ShapeType): boolean
========================================================

[contains](#Ellipse-contains)(point: Vec2): boolean
===================================================

[raycast](#Ellipse-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=========================================================================

[random](#Ellipse-random)(): Vec2
=================================



[Polygon](#Polygon):
====================

[pts](#Polygon-pts): Vec2\[\]
=============================

[transform](#Polygon-transform)(m: Mat23): Polygon
==================================================

[bbox](#Polygon-bbox)(): Rect
=============================

[area](#Polygon-area)(): number
===============================

[clone](#Polygon-clone)(): Polygon
==================================

[collides](#Polygon-collides)(shape: ShapeType | Vec2): boolean
===============================================================

[contains](#Polygon-contains)(point: Vec2): boolean
===================================================

[raycast](#Polygon-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=========================================================================

[random](#Polygon-random)(): Vec2
=================================

[cut](#Polygon-cut)(a: Vec2, b: Vec2): \[Polygon | null, Polygon | null\]
=========================================================================



[UniformValue](#UniformValue): number | Vec2 | Color | Mat4 | number\[\] | Vec2\[\] | Color\[\]
===============================================================================================



[UniformKey](#UniformKey): Exclude<string, u\_tex\>
===================================================



[Uniform](#Uniform): Record<UniformKey, UniformValue\>
======================================================



[raycast](#raycast)(origin: Vec2, direction: Vec2, exclude?: string\[\]): RaycastResult
=======================================================================================

Create a raycast.

`since`v3001.0



[vec2](#vec2)(x: number, y: number): Vec2
=========================================

Create a 2D vector.

    // { x: 0, y: 0 }
    vec2()

    // { x: 10, y: 10 }
    vec2(10)

    // { x: 100, y: 80 }
    vec2(100, 80)

    // move to 150 degrees direction with by length 10
    player.pos = pos.add(Vec2.fromAngle(150).scale(10))


`returns`The vector.

`since`v2000.0



[vec2](#vec2)(p: Vec2): Vec2
============================



[vec2](#vec2)(xy: number): Vec2
===============================



[vec2](#vec2)(): Vec2
=====================



[rgb](#rgb)(r: number, g: number, b: number): Color
===================================================

Create a color from RGB values (0 - 255).

`param`r\- The red value.

`param`g\- The green value.

`param`b\- The blue value.

    // update the color of the sky to light blue
    sky.color = rgb(0, 128, 255)


`returns`The color.

`since`v2000.0



[rgb](#rgb)(hex: string): Color
===============================

Create a color from hex string.

`param`hex\- The hex string.

    sky.color = rgb("#ef6360")

`returns`The color.

`since`v2000.0



[rgb](#rgb)(): Color
====================

Same as rgb(255, 255, 255).



[hsl2rgb](#hsl2rgb)(hue: number, saturation: number, lightness: number): Color
==============================================================================

Convert HSL color (all values in 0.0 - 1.0 range) to RGB color.

`param`hue\- The hue value.

`param`saturation\- The saturation value.

`param`lightness\- The lightness value.

    // animate rainbow color
    onUpdate("rainbow", (obj) => {
        obj.color = hsl2rgb(wave(0, 1, time()), 0.6, 0.6);
    });


`returns`The color.

`since`v2000.1



[quad](#quad)(x: number, y: number, w: number, h: number): Quad
===============================================================

Rectangle area (0.0 - 1.0).

`param`x\- The x position of the rectangle.

`param`y\- The y position of the rectangle.

`param`w\- The width of the rectangle.

`param`h\- The height of the rectangle.

`returns`A Quad object.

`since`v3001.0



[chance](#chance)(p: number): boolean
=====================================

rand(1) <= p

    // every frame all objs with tag "unlucky" have 50% chance die
    onUpdate("unlucky", (o) => {
        if (chance(0.5)) {
            destroy(o)
        }
    })


(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[lerp](#lerp)<V\>(from: V, to: V, t: number): V
===============================================

Linear interpolation.



[tween](#tween)<V\>(from: V, to: V, duration: number, setValue: (value: V)\=>void, easeFunc?: (t: number)\=>number): TweenController
====================================================================================================================================

Tweeeeeeeening!

`since`v3000.0

    // tween bean to mouse position
    tween(bean.pos, mousePos(), 1, (p) => bean.pos = p, easings.easeOutBounce)




[easings](#easings): Record<EaseFuncs, EaseFunc\>
=================================================

A collection of easing functions for tweening.

`since`v3000.0



[easingSteps](#easingSteps)(steps: number, position: StepPosition): number
==========================================================================

Steps easing. Eases in discontinious steps.

`since`v3001.0



[easingLinear](#easingLinear)(keys: Vec2\[\]): number
=====================================================

Linear easing with keyframes

`since`v3001.0



[easingCubicBezier](#easingCubicBezier)(p1: Vec2, p2: Vec2): number
===================================================================

Bezier easing. Both control points need x to be within 0 and 1.

`since`v3001.0



[map](#map)(v: number, l1: number, h1: number, l2: number, h2: number): number
==============================================================================

Map a value from one range to another range. If the value overshoots, the source range, the result values will also do. For clamping check mapc

`param`vThe value the function will depend on.

`param`l1The minimum value of the source range.

`param`h1The minimum result value.

`param`l2The maximum value of the source range.

`param`h2The maximum result value.

    onUpdate(() => {
         // Redness will be 0 when the mouse is at the left edge and 255 when the mouse is at the right edge
         const redness = map(mousePos().x, 0, width(), 0, 255)
         setBackground(rgb(redness, 0, 0))
    })


`returns`The result value based on the source value.

`since`v2000.0



[mapc](#mapc)(v: number, l1: number, h1: number, l2: number, h2: number): number
================================================================================

Map a value from one range to another range, and clamp to the dest range.

`param`vThe value the function will depend on.

`param`l1The minimum value of the source range.

`param`h1The minimum result value.

`param`l2The maximum value of the source range.

`param`h2The maximum result value.

    onUpdate(() => {
         // This variable will be 0 when the mouse is at the left edge and 255 when the mouse is at the right edge
         const redness = mapc(mousePos().x, 0, width(), 0, 255)
         setBackground(rgb(redness, 0, 0))
    })


`returns`The clamped result value based on the source value.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[wave](#wave)(lo: number, hi: number, t: number, func?: (x: number)\=>number): number
=====================================================================================

Interpolate between 2 values (Optionally takes a custom periodic function, which default to Math.sin).

    // bounce color between 2 values as time goes on
    onUpdate("colorful", (c) => {
        c.color.r = wave(0, 255, time())
        c.color.g = wave(0, 255, time() + 1)
        c.color.b = wave(0, 255, time() + 2)
    })


(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[deg2rad](#deg2rad)(deg: number): number
========================================

Convert degrees to radians.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[rad2deg](#rad2deg)(rad: number): number
========================================

Convert radians to degrees.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[clamp](#clamp)(n: number, min: number, max: number): number
============================================================

Return a value clamped to an inclusive range of min and max.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[evaluateQuadratic](#evaluateQuadratic)(pt1: Vec2, pt2: Vec2, pt3: Vec2, t: number): Vec2
=========================================================================================

Evaluate the quadratic Bezier at the given t



[evaluateQuadraticFirstDerivative](#evaluateQuadraticFirstDerivative)(pt1: Vec2, pt2: Vec2, pt3: Vec2, t: number): Vec2
=======================================================================================================================

Evaluate the first derivative of a quadratic bezier at the given t

`since`v3001.0



[evaluateQuadraticSecondDerivative](#evaluateQuadraticSecondDerivative)(pt1: Vec2, pt2: Vec2, pt3: Vec2, t: number): Vec2
=========================================================================================================================

Evaluate the second derivative of a quadratic bezier at the given t

`since`v3001.0



[evaluateBezier](#evaluateBezier)(pt1: Vec2, pt2: Vec2, pt3: Vec2, pt4: Vec2, t: number): Vec2
==============================================================================================

Evaluate the cubic Bezier at the given t

`since`v3001.0



[evaluateBezierFirstDerivative](#evaluateBezierFirstDerivative)(pt1: Vec2, pt2: Vec2, pt3: Vec2, pt4: Vec2, t: number): Vec2
============================================================================================================================

Evaluate the first derivative of a cubic Bezier at the given t



[evaluateBezierSecondDerivative](#evaluateBezierSecondDerivative)(pt1: Vec2, pt2: Vec2, pt3: Vec2, pt4: Vec2, t: number): Vec2
==============================================================================================================================

Evaluate the second derivative of a cubic bezier at the given t

`since`v3001.0



[evaluateCatmullRom](#evaluateCatmullRom)(pt1: Vec2, pt2: Vec2, pt3: Vec2, pt4: Vec2, t: number): Vec2
======================================================================================================

Evaluate the Catmull-Rom spline at the given t

`since`v3001.0



[evaluateCatmullRomFirstDerivative](#evaluateCatmullRomFirstDerivative)(pt1: Vec2, pt2: Vec2, pt3: Vec2, pt4: Vec2, t: number): Vec2
====================================================================================================================================

Evaluate the first derivative of a Catmull-Rom spline at the given t

`since`v3001.0



[curveLengthApproximation](#curveLengthApproximation)(curve: (t: number)\=>Vec2, entries: number, detail: number): number
=========================================================================================================================

Returns a function. entries is the amount of entries in the LUT. detail is the sampling granularity of each segment recorded in the LUT. This new function either returns the length for a given t, or t for a given length, depending on the inverse parameter.

`since`v3001.0



[normalizedCurve](#normalizedCurve)(curve: (t: number)\=>Vec2): Vec2
====================================================================

Returns a new curve which is normalized. This new curve has constant speed curve is any curve in t (non-constant between 0 and 1) returns a curve in s (constant between 0 and 1)

`since`v3001.0



[testLinePoint](#testLinePoint)(l: Line, pt: Vec2): boolean
===========================================================

Check if a line and a point intersect.

`param`l\- The line.

`param`pt\- The point.

`returns`true if the line and point intersects.

`since`v2000.0



[testLineLine](#testLineLine)(l1: Line, l2: Line): Vec2 | null
==============================================================

Check if 2 lines intersects, if yes returns the intersection point.

`param`l1\- The first line.

`param`l2\- The second line.

`return`The intersection point, or null if the lines are parallel.

`since`v2000.0



[testLineCircle](#testLineCircle)(l: Line, c: Circle): boolean
==============================================================

Check if a line and a circle intersect.

`param`l\- The line.

`param`c\- The circle.

`returns`true if the line and circle intersects.

`since`v2000.0



[testRectRect](#testRectRect)(r1: Rect, r2: Rect): boolean
==========================================================

Check if 2 rectangle overlaps.

`param`r1\- The first rectangle.

`param`r2\- The second rectangle.

`returns`true if the rectangles overlap.

`since`v2000.0



[testRectLine](#testRectLine)(r: Rect, l: Line): boolean
========================================================

Check if a line and a rectangle overlaps.

`param`r\- The line.

`param`l\- The rectangle.

`returns`true if the line and rectangle overlaps.

`since`v2000.0



[testRectPoint](#testRectPoint)(r: Rect, pt: Vec2): boolean
===========================================================

Check if a point is inside a rectangle.

`param`r\- The rectangle.

`param`pt\- The point.

`returns`true if the point is inside the rectangle.

`since`v2000.0



[testCirclePolygon](#testCirclePolygon)(c: Circle, p: Polygon): boolean
=======================================================================

Check if a circle and polygon intersect linewise.

`param`c\- The circle.

`param`p\- The polygon.

`returns`true if the circle and polygon intersect linewise.

`since`v2000.0



[clipLineToRect](#clipLineToRect)(r: Rect, l: Line, result: Line): boolean
==========================================================================

`since`v4000.0



[clipLineToCircle](#clipLineToCircle)(c: Circle, l: Line, result: Line): boolean
================================================================================

`since`v4000.0



[gjkShapeIntersects](#gjkShapeIntersects)(shapeA: Shape, shapeB: Shape): boolean
================================================================================

`since`v4000.0



[gjkShapeIntersection](#gjkShapeIntersection)(shapeA: Shape, shapeB: Shape): GjkCollisionResult | null
======================================================================================================

`since`v4000.0



[isConvex](#isConvex)(pts: Vec2\[\]): boolean
=============================================

`since`v3001.0



[triangulate](#triangulate)(pts: Vec2\[\]): Vec2\[\]\[\]
========================================================

`since`v3001.0



[NavMesh](#NavMesh):
====================

[\_polygons](#NavMesh-_polygons):
=================================

[\_pointCache](#NavMesh-_pointCache):
=====================================

[\_edgeCache](#NavMesh-_edgeCache):
===================================

[\_addPoint](#NavMesh-_addPoint):
=================================

[\_addEdge](#NavMesh-_addEdge):
===============================

[\_findEdge](#NavMesh-_findEdge):
=================================

[\_findCommonEdge](#NavMesh-_findCommonEdge):
=============================================

[addPolygon](#NavMesh-addPolygon)(vertices: Vec2\[\]): NavPolygon
=================================================================

[addRect](#NavMesh-addRect)(pos: Vec2, size: Vec2): NavPolygon
==============================================================

[\_getLocation](#NavMesh-_getLocation):
=======================================

[getNeighbours](#NavMesh-getNeighbours)(index: number): number\[\]
==================================================================

[getCost](#NavMesh-getCost)(a: number, b: number): number
=========================================================

[getHeuristic](#NavMesh-getHeuristic)(indexA: number, indexB: number): number
=============================================================================

[getPath](#NavMesh-getPath)(start: number, goal: number): number\[\]
====================================================================

[getWaypointPath](#NavMesh-getWaypointPath)(start: Vec2, goal: Vec2, opt: any): Vec2\[\]
========================================================================================



[Point](#Point):
================

[pt](#Point-pt): Vec2
=====================

[transform](#Point-transform)(m: Mat23): Point
==============================================

[bbox](#Point-bbox)(): Rect
===========================

[area](#Point-area)(): number
=============================

[clone](#Point-clone)(): Point
==============================

[collides](#Point-collides)(shape: ShapeType): boolean
======================================================

[contains](#Point-contains)(point: Vec2): boolean
=================================================

[raycast](#Point-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=======================================================================

[random](#Point-random)(): Vec2
===============================



[Line](#Line):
==============

[p1](#Line-p1): Vec2
====================

[p2](#Line-p2): Vec2
====================

[transform](#Line-transform)(m: Mat23): Line
============================================

[bbox](#Line-bbox)(): Rect
==========================

[area](#Line-area)(): number
============================

[clone](#Line-clone)(): Line
============================

[collides](#Line-collides)(shape: ShapeType | Vec2): boolean
============================================================

[contains](#Line-contains)(point: Vec2): boolean
================================================

[raycast](#Line-raycast)(origin: Vec2, direction: Vec2): RaycastResult
======================================================================

[random](#Line-random)(): Vec2
==============================



[Rect](#Rect):
==============

[pos](#Rect-pos): Vec2
======================

[width](#Rect-width): number
============================

[height](#Rect-height): number
==============================

[fromPoints](#Rect-fromPoints)(p1: Vec2, p2: Vec2): Rect
========================================================

[center](#Rect-center)(): Vec2
==============================

[points](#Rect-points)(): \[Vec2, Vec2, Vec2, Vec2\]
====================================================

[transform](#Rect-transform)(m: Mat23): Polygon
===============================================

[bbox](#Rect-bbox)(): Rect
==========================

[area](#Rect-area)(): number
============================

[clone](#Rect-clone)(): Rect
============================

[distToPoint](#Rect-distToPoint)(p: Vec2): number
=================================================

[sdistToPoint](#Rect-sdistToPoint)(p: Vec2): number
===================================================

[collides](#Rect-collides)(shape: ShapeType | Vec2): boolean
============================================================

[contains](#Rect-contains)(point: Vec2): boolean
================================================

[raycast](#Rect-raycast)(origin: Vec2, direction: Vec2): RaycastResult
======================================================================

[random](#Rect-random)(): Vec2
==============================



[Circle](#Circle):
==================

[center](#Circle-center): Vec2
==============================

[radius](#Circle-radius): number
================================

[transform](#Circle-transform)(tr: Mat23): Ellipse
==================================================

[bbox](#Circle-bbox)(): Rect
============================

[area](#Circle-area)(): number
==============================

[clone](#Circle-clone)(): Circle
================================

[collides](#Circle-collides)(shape: ShapeType | Vec2): boolean
==============================================================

[contains](#Circle-contains)(point: Vec2): boolean
==================================================

[raycast](#Circle-raycast)(origin: Vec2, direction: Vec2): RaycastResult
========================================================================

[random](#Circle-random)(): Vec2
================================



[Ellipse](#Ellipse):
====================

[center](#Ellipse-center): Vec2
===============================

[radiusX](#Ellipse-radiusX): number
===================================

[radiusY](#Ellipse-radiusY): number
===================================

[angle](#Ellipse-angle): number
===============================

[fromMat2](#Ellipse-fromMat2)(tr: Mat2): Ellipse
================================================

[toMat2](#Ellipse-toMat2)(): Mat2
=================================

[transform](#Ellipse-transform)(tr: Mat23): Ellipse
===================================================

[bbox](#Ellipse-bbox)(): Rect
=============================

[area](#Ellipse-area)(): number
===============================

[clone](#Ellipse-clone)(): Ellipse
==================================

[collides](#Ellipse-collides)(shape: ShapeType): boolean
========================================================

[contains](#Ellipse-contains)(point: Vec2): boolean
===================================================

[raycast](#Ellipse-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=========================================================================

[random](#Ellipse-random)(): Vec2
=================================



[Polygon](#Polygon):
====================

[pts](#Polygon-pts): Vec2\[\]
=============================

[transform](#Polygon-transform)(m: Mat23): Polygon
==================================================

[bbox](#Polygon-bbox)(): Rect
=============================

[area](#Polygon-area)(): number
===============================

[clone](#Polygon-clone)(): Polygon
==================================

[collides](#Polygon-collides)(shape: ShapeType | Vec2): boolean
===============================================================

[contains](#Polygon-contains)(point: Vec2): boolean
===================================================

[raycast](#Polygon-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=========================================================================

[random](#Polygon-random)(): Vec2
=================================

[cut](#Polygon-cut)(a: Vec2, b: Vec2): \[Polygon | null, Polygon | null\]
=========================================================================



[Vec2](#Vec2):
==============

A 2D vector.

[x](#Vec2-x): number
====================

The x coordinate

[y](#Vec2-y): number
====================

The y coordinate

[fromAngle](#Vec2-fromAngle)(deg: number): Vec2
===============================================

Create a new Vec2 from an angle in degrees

[fromArray](#Vec2-fromArray)(arr: Array): Vec2
==============================================

Create a new Vec2 from an array

[ZERO](#Vec2-ZERO): Vec2
========================

An empty vector. (0, 0)

[ONE](#Vec2-ONE): Vec2
======================

A vector with both components of 1. (1, 1)

[LEFT](#Vec2-LEFT): Vec2
========================

A vector signaling to the left. (-1, 0)

[RIGHT](#Vec2-RIGHT): Vec2
==========================

A vector signaling to the right. (1, 0)

[UP](#Vec2-UP): Vec2
====================

A vector signaling up. (0, -1)

[DOWN](#Vec2-DOWN): Vec2
========================

A vector signaling down. (0, 1)

[toAxis](#Vec2-toAxis)(): Vec2
==============================

Closest orthogonal direction: LEFT, RIGHT, UP, or DOWN

[clone](#Vec2-clone)(): Vec2
============================

Clone the vector

[copy](#Vec2-copy)(v: Vec2, out: Vec2): Vec2
============================================

[add](#Vec2-add)(args: Vec2Args): Vec2
======================================

Returns the sum with another vector.

[add](#Vec2-add)(v: Vec2, other: Vec2, out: Vec2): Vec2
=======================================================

Calculates the sum of the vectors

`param`vThe first term

`param`otherThe second term

`param`outThe vector sum

`returns`The sum of the vectors

[addScaled](#Vec2-addScaled)(v: Vec2, other: Vec2, s: number, out: Vec2): Vec2
==============================================================================

[addc](#Vec2-addc)(v: Vec2, x: number, y: number, out: Vec2): Vec2
==================================================================

Calculates the sum of the vectors

`param`vThe first term

`param`xThe x of the second term

`param`yThe y of the second term

`param`outThe vector sum

`returns`The sum of the vectors

[sub](#Vec2-sub)(args: Vec2Args): Vec2
======================================

Returns the difference with another vector.

[sub](#Vec2-sub)(v: Vec2, other: Vec2, out: Vec2): Vec2
=======================================================

Calculates the difference of the vectors

`param`vThe first term

`param`otherThe second term

`param`outThe vector difference

`returns`The difference of the vectors

[subc](#Vec2-subc)(v: Vec2, x: number, y: number, out: Vec2): Vec2
==================================================================

Calculates the difference of the vectors

`param`vThe first term

`param`xThe x of the second term

`param`yThe y of the second term

`param`outThe vector difference

`returns`The difference of the vectors

[scale](#Vec2-scale)(args: Vec2Args): Vec2
==========================================

Scale by another vector. or a single number

[scale](#Vec2-scale)(v: Vec2, s: number, out: Vec2): Vec2
=========================================================

Calculates the scale of the vector

`param`vThe vector

`param`sThe x scale

`param`outThe y scale

`param`unknownThe scaled vector

`returns`The scale of the vector

[scalec](#Vec2-scalec)(v: Vec2, x: number, y: number, out: Vec2): Vec2
======================================================================

Calculates the scale of the vector

`param`vThe vector

`param`xThe x scale

`param`yThe y scale

`param`outThe scaled vector

`returns`The scale of the vector

[scalev](#Vec2-scalev)(v: Vec2, other: Vec2, out: Vec2): Vec2
=============================================================

Calculates the scale of the vector

`param`vThe vector

`param`otherThe scale

`param`outThe scaled vector

`returns`The scale of the vector

[invScale](#Vec2-invScale)(args: Vec2Args): Vec2
================================================

Scale by the inverse of another vector. or a single number

[dist](#Vec2-dist)(args: Vec2Args): number
==========================================

Get distance between another vector

[dist](#Vec2-dist)(v: Vec2, other: Vec2): number
================================================

Calculates the distance between the vectors

`param`vThe vector

`param`otherThe other vector

`returns`The between the vectors

[sdist](#Vec2-sdist)(args: Vec2Args): number
============================================

Get squared distance between another vector

[sdist](#Vec2-sdist)(v: Vec2, other: Vec2): number
==================================================

Calculates the squared distance between the vectors

`param`vThe vector

`param`otherThe other vector

`returns`The distance between the vectors

[len](#Vec2-len)(): number
==========================

Get length of the vector

`since`v3000.0

[len](#Vec2-len)(v: Vec2): number
=================================

Calculates the length of the vector

`param`vThe vector

`returns`The length of the vector

[slen](#Vec2-slen)(): number
============================

Get squared length of the vector

`since`v3000.0

[slen](#Vec2-slen)(v: Vec2): number
===================================

Calculates the squared length of the vector

`param`vThe vector

`returns`The squared length of the vector

[unit](#Vec2-unit)(): Vec2
==========================

Get the unit vector (length of 1).

[unit](#Vec2-unit)(v: Vec2, out: Vec2): Vec2
============================================

[normal](#Vec2-normal)(): Vec2
==============================

Get the perpendicular vector.

[normal](#Vec2-normal)(v: Vec2, out: Vec2): Vec2
================================================

[reflect](#Vec2-reflect)(normal: Vec2): Vec2
============================================

Get the reflection of a vector with a normal.

`since`v3000.0

[project](#Vec2-project)(on: Vec2): Vec2
========================================

Get the projection of a vector onto another vector.

`since`v3000.0

[reject](#Vec2-reject)(on: Vec2): Vec2
======================================

Get the rejection of a vector onto another vector.

`since`v3000.0

[rotate](#Vec2-rotate)(vecOrAngle: Vec2 | number): Vec2
=======================================================

[rotate](#Vec2-rotate)(v: Vec2, dir: Vec2, out: Vec2): Vec2
===========================================================

Calculates the rotated vector

`param`vThe vector

`param`dirThe rotation vector

`param`outThe rotated vector

`returns`The rotated vector

[rotateByAngle](#Vec2-rotateByAngle)(v: Vec2, angle: number, out: Vec2): Vec2
=============================================================================

Calculates the rotated vector

`param`vThe vector

`param`angleThe angle in radians

`param`outThe rotated vector

`returns`The rotated vector

[invRotate](#Vec2-invRotate)(vecOrAngle: Vec2 | number): Vec2
=============================================================

[inverseRotate](#Vec2-inverseRotate)(v: Vec2, dir: Vec2, out: Vec2): Vec2
=========================================================================

Calculates the inverse rotated vector

`param`vThe vector

`param`dirThe rotation vector

`param`outThe rotated vector

`returns`The rotated vector

[dot](#Vec2-dot)(p2: Vec2): number
==================================

Get the dot product with another vector.

[dot](#Vec2-dot)(v: Vec2, other: Vec2): number
==============================================

Get the dot product between 2 vectors.

`since`v3000.0

[cross](#Vec2-cross)(p2: Vec2): number
======================================

Get the cross product with another vector.

`since`v3000.0

[cross](#Vec2-cross)(v: Vec2, other: Vec2): number
==================================================

Get the cross product between 2 vectors.

`since`v3000.0

[angle](#Vec2-angle)(args: Vec2Args): number
============================================

Get the angle of the vector in degrees.

[toAngle](#Vec2-toAngle)(v: Vec2): number
=========================================

Calculates the angle represented by the vector in radians

`param`vThe vector

`returns`Angle represented by the vector in radians

[angleBetween](#Vec2-angleBetween)(args: Vec2Args): number
==========================================================

Get the angle between this vector and another vector.

`since`v3000.0

[angleBetween](#Vec2-angleBetween)(v: Vec2, other: Vec2): number
================================================================

Calculates the angle between the vectors in radians

`param`vFirst vector

`param`otherSecond vector

`returns`Angle between the vectors in radians

[lerp](#Vec2-lerp)(dest: Vec2, t: number): Vec2
===============================================

Linear interpolate to a destination vector (for positions).

[lerp](#Vec2-lerp)(src: Vec2, dst: Vec2, t: number, out: Vec2): Vec2
====================================================================

Linear interpolate src and dst by t

`param`srcFirst vector

`param`dstSecond vector

`param`tPercentage

`param`outThe linear interpolation between src and dst by t

`returns`The linear interpolation between src and dst by t

[slerp](#Vec2-slerp)(dest: Vec2, t: number): Vec2
=================================================

Spherical linear interpolate to a destination vector (for rotations).

`since`v3000.0

[slerp](#Vec2-slerp)(src: Vec2, dst: Vec2, t: number, out: Vec2): Vec2
======================================================================

Spherical interpolate src and dst by t

`param`srcFirst vector

`param`dstSecond vector

`param`tPercentage

`param`outThe spherical interpolation between src and dst by t

`returns`The spherical interpolation between src and dst by t

[isZero](#Vec2-isZero)(): boolean
=================================

If the vector (x, y) is zero.

`since`v3000.0

[toFixed](#Vec2-toFixed)(n: number): Vec2
=========================================

To n precision floating point.

[transform](#Vec2-transform)(m: Mat4): Vec2
===========================================

Multiply by a Mat4.

`since`v3000.0

[eq](#Vec2-eq)(other: Vec2): boolean
====================================

See if one vector is equal to another.

`since`v3000.0

[bbox](#Vec2-bbox)(): Rect
==========================

Converts the vector to a Rect`Rect()` with the vector as the origin.

`since`v3000.0.

[toArray](#Vec2-toArray)(): Array<number\>
==========================================

Converts the vector to an array.

`since`v3001.0



[Color](#Color):
================

0-255 RGBA color.

[r](#Color-r): number
=====================

Red (0-255.

[g](#Color-g): number
=====================

Green (0-255).

[b](#Color-b): number
=====================

Blue (0-255).

[fromArray](#Color-fromArray)(arr: number\[\]): Color
=====================================================

[fromHex](#Color-fromHex)(hex: string | number): Color
======================================================

Create color from hex string or literal.

    Color.fromHex(0xfcef8d)
    Color.fromHex("#5ba675")
    Color.fromHex("d46eb3")


`since`v3000.0

[fromHSL](#Color-fromHSL)(h: number, s: number, l: number): Color
=================================================================

[RED](#Color-RED): Color
========================

[GREEN](#Color-GREEN): Color
============================

[BLUE](#Color-BLUE): Color
==========================

[YELLOW](#Color-YELLOW): Color
==============================

[MAGENTA](#Color-MAGENTA): Color
================================

[CYAN](#Color-CYAN): Color
==========================

[WHITE](#Color-WHITE): Color
============================

[BLACK](#Color-BLACK): Color
============================

[clone](#Color-clone)(): Color
==============================

[lighten](#Color-lighten)(a: number): Color
===========================================

Lighten the color (adds RGB by n).

[darken](#Color-darken)(a: number): Color
=========================================

Darkens the color (subtracts RGB by n).

[invert](#Color-invert)(): Color
================================

[mult](#Color-mult)(other: Color): Color
========================================

[lerp](#Color-lerp)(dest: Color, t: number): Color
==================================================

Linear interpolate to a destination color.

`since`v3000.0

[toHSL](#Color-toHSL)(): \[number, number, number\]
===================================================

Convert color into HSL format.

`since`v3001.0

[eq](#Color-eq)(other: Color): boolean
======================================

[toHex](#Color-toHex)(): string
===============================

Return the hex string of color.

`since`v3000.0

[toArray](#Color-toArray)(): Array<number\>
===========================================

Return the color converted to an array.

`since`v3001.0



[Mat4](#Mat4):
==============

[m](#Mat4-m): number\[\]
========================

[translate](#Mat4-translate)(p: Vec2): Mat4
===========================================

[translate](#Mat4-translate)(p: Vec2): this
===========================================

[scale](#Mat4-scale)(s: Vec2): Mat4
===================================

[scale](#Mat4-scale)(p: Vec2): this
===================================

[rotateX](#Mat4-rotateX)(a: number): Mat4
=========================================

[rotateY](#Mat4-rotateY)(a: number): Mat4
=========================================

[rotateZ](#Mat4-rotateZ)(a: number): Mat4
=========================================

[rotate](#Mat4-rotate)(a: number): Mat4
=======================================

[mult](#Mat4-mult)(other: Mat4): Mat4
=====================================

[multVec2](#Mat4-multVec2)(p: Vec2): Vec2
=========================================

[getTranslation](#Mat4-getTranslation)(): Vec2
==============================================

[getScale](#Mat4-getScale)(): Vec2
==================================

[getRotation](#Mat4-getRotation)(): number
==========================================

[getSkew](#Mat4-getSkew)(): Vec2
================================

[invert](#Mat4-invert)(): Mat4
==============================

[clone](#Mat4-clone)(): Mat4
============================



[Mat23](#Mat23):
================

[a](#Mat23-a): number
=====================

[b](#Mat23-b): number
=====================

[c](#Mat23-c): number
=====================

[d](#Mat23-d): number
=====================

[e](#Mat23-e): number
=====================

[f](#Mat23-f): number
=====================

[fromMat2](#Mat23-fromMat2)(m: Mat2): Mat23
===========================================

[toMat2](#Mat23-toMat2)(): Mat2
===============================

[fromTranslation](#Mat23-fromTranslation)(t: Vec2): Mat23
=========================================================

[fromRotation](#Mat23-fromRotation)(radians: number): Mat23
===========================================================

[fromScale](#Mat23-fromScale)(s: Vec2): Mat23
=============================================

[clone](#Mat23-clone)(): Mat23
==============================

[setMat23](#Mat23-setMat23)(m: Mat23): void
===========================================

[setIdentity](#Mat23-setIdentity)(): void
=========================================

[mul](#Mat23-mul)(other: Mat23): Mat23
======================================

[translateSelfV](#Mat23-translateSelfV)(t: Vec2): Mat23
=======================================================

[translateSelf](#Mat23-translateSelf)(x: number, y: number): Mat23
==================================================================

[rotateSelf](#Mat23-rotateSelf)(degrees: number): Mat23
=======================================================

[scaleSelfV](#Mat23-scaleSelfV)(s: Vec2): Mat23
===============================================

[scaleSelf](#Mat23-scaleSelf)(x: number, y: number): Mat23
==========================================================

[mulSelf](#Mat23-mulSelf)(other: Mat23): void
=============================================

[transform](#Mat23-transform)(p: Vec2): Vec2
============================================

[transformPoint](#Mat23-transformPoint)(p: Vec2, o: Vec2): Vec2
===============================================================

[transformVector](#Mat23-transformVector)(v: Vec2, o: Vec2): Vec2
=================================================================

[det](#Mat23-det)(): number
===========================

[inverse](#Mat23-inverse)(): Mat23
==================================

[getTranslation](#Mat23-getTranslation)(): Vec2
===============================================

[getRotation](#Mat23-getRotation)(): number
===========================================

[getScale](#Mat23-getScale)(): Vec2
===================================



[Quad](#Quad):
==============

[x](#Quad-x): number
====================

[y](#Quad-y): number
====================

[w](#Quad-w): number
====================

[h](#Quad-h): number
====================

[scale](#Quad-scale)(other: Quad): Quad
=======================================

[pos](#Quad-pos)(): Vec2
========================

[clone](#Quad-clone)(): Quad
============================

[eq](#Quad-eq)(other: Quad): boolean
====================================



[RNG](#RNG):
============

[seed](#RNG-seed): number
=========================

[gen](#RNG-gen)(): number
=========================

[genNumber](#RNG-genNumber)(a: number, b: number): number
=========================================================

[genVec2](#RNG-genVec2)(a: Vec2, b: Vec2): Vec2
===============================================

[genColor](#RNG-genColor)(a: Color, b: Color): Color
====================================================

[genAny](#RNG-genAny)<T\>(args: \[\] | \[T\] | \[T, T\]): T
===========================================================



[LerpValue](#LerpValue): number | Vec2 | Color
==============================================



[RNGValue](#RNGValue): number | Vec2 | Color
============================================



[Collision](#Collision):
========================

Collision resolution data.

[source](#Collision-source): GameObj
====================================

The first game object in the collision.

[target](#Collision-target): GameObj
====================================

The second game object in the collision.

[normal](#Collision-normal): Vec2
=================================

The contact normal.

[distance](#Collision-distance): Vec2
=====================================

The length of the displacement.

[displacement](#Collision-displacement): Vec2
=============================================

The displacement source game object have to make to avoid the collision.

[resolved](#Collision-resolved): boolean
========================================

If the collision is resolved.

[preventResolution](#Collision-preventResolution)(): void
=========================================================

Prevent collision resolution if not yet resolved.

`since`v3000.0

[hasOverlap](#Collision-hasOverlap)(): boolean
==============================================

If the 2 objects have any overlap, or they're just touching edges.

`since`v3000.0

[reverse](#Collision-reverse)(): Collision
==========================================

Get a new collision with reversed source and target relationship.

[isTop](#Collision-isTop)(): boolean
====================================

If the collision happened (roughly) on the top side.

[isBottom](#Collision-isBottom)(): boolean
==========================================

If the collision happened (roughly) on the bottom side.

[isLeft](#Collision-isLeft)(): boolean
======================================

If the collision happened (roughly) on the left side.

[isRight](#Collision-isRight)(): boolean
========================================

If the collision happened (roughly) on the right side.



[Edge](#Edge): left | right | top | bottom
==========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[EdgeMask](#EdgeMask):
======================

[None](#EdgeMask-None):
=======================

[Left](#EdgeMask-Left):
=======================

[Top](#EdgeMask-Top):
=====================

[LeftTop](#EdgeMask-LeftTop):
=============================

[Right](#EdgeMask-Right):
=========================

[Horizontal](#EdgeMask-Horizontal):
===================================

[RightTop](#EdgeMask-RightTop):
===============================

[HorizontalTop](#EdgeMask-HorizontalTop):
=========================================

[Bottom](#EdgeMask-Bottom):
===========================

[LeftBottom](#EdgeMask-LeftBottom):
===================================

[Vertical](#EdgeMask-Vertical):
===============================

[LeftVertical](#EdgeMask-LeftVertical):
=======================================

[RightBottom](#EdgeMask-RightBottom):
=====================================

[HorizontalBottom](#EdgeMask-HorizontalBottom):
===============================================

[RightVertical](#EdgeMask-RightVertical):
=========================================

[All](#EdgeMask-All):
=====================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[EaseFuncs](#EaseFuncs): linear | easeInSine | easeOutSine | easeInOutSine | easeInQuad | easeOutQuad | easeInOutQuad | easeInCubic | easeOutCubic | easeInOutCubic | easeInQuart | easeOutQuart | easeInOutQuart | easeInQuint | easeOutQuint | easeInOutQuint | easeInExpo | easeOutExpo | easeInOutExpo | easeInCirc | easeOutCirc | easeInOutCirc | easeInBack | easeOutBack | easeInOutBack | easeInElastic | easeOutElastic | easeInOutElastic | easeInBounce | easeOutBounce | easeInOutBounce
=====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

The list of easing functions available.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[EaseFunc](#EaseFunc)(t: number): number
========================================

A function that takes a time value and returns a new time value.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[RGBValue](#RGBValue): \[number, number, number\]
=================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[RGBAValue](#RGBAValue): \[number, number, number, number\]
===========================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[ColorArgs](#ColorArgs): \[Color\] | \[Color, number\] | RGBValue | RGBAValue | \[string\] | \[number\[\]\] | \[\]
==================================================================================================================



[Mat2](#Mat2):
==============

[a](#Mat2-a): number
====================

[b](#Mat2-b): number
====================

[c](#Mat2-c): number
====================

[d](#Mat2-d): number
====================

[mul](#Mat2-mul)(other: Mat2): Mat2
===================================

[transform](#Mat2-transform)(point: Vec2): Vec2
===============================================

[inverse](#Mat2-inverse)(): Mat2
================================

[transpose](#Mat2-transpose)(): Mat2
====================================

[eigenvalues](#Mat2-eigenvalues)(): number\[\]
==============================================

[eigenvectors](#Mat2-eigenvectors)(e1: number, e2: number): number\[\]\[\]
==========================================================================

[det](#Mat2-det)(): number
==========================

[trace](#Mat2-trace)(): number
==============================

[rotation](#Mat2-rotation)(radians: number): Mat2
=================================================

[scale](#Mat2-scale)(x: number, y: number): Mat2
================================================



[Mat23](#Mat23):
================

[a](#Mat23-a): number
=====================

[b](#Mat23-b): number
=====================

[c](#Mat23-c): number
=====================

[d](#Mat23-d): number
=====================

[e](#Mat23-e): number
=====================

[f](#Mat23-f): number
=====================

[fromMat2](#Mat23-fromMat2)(m: Mat2): Mat23
===========================================

[toMat2](#Mat23-toMat2)(): Mat2
===============================

[fromTranslation](#Mat23-fromTranslation)(t: Vec2): Mat23
=========================================================

[fromRotation](#Mat23-fromRotation)(radians: number): Mat23
===========================================================

[fromScale](#Mat23-fromScale)(s: Vec2): Mat23
=============================================

[clone](#Mat23-clone)(): Mat23
==============================

[setMat23](#Mat23-setMat23)(m: Mat23): void
===========================================

[setIdentity](#Mat23-setIdentity)(): void
=========================================

[mul](#Mat23-mul)(other: Mat23): Mat23
======================================

[translateSelfV](#Mat23-translateSelfV)(t: Vec2): Mat23
=======================================================

[translateSelf](#Mat23-translateSelf)(x: number, y: number): Mat23
==================================================================

[rotateSelf](#Mat23-rotateSelf)(degrees: number): Mat23
=======================================================

[scaleSelfV](#Mat23-scaleSelfV)(s: Vec2): Mat23
===============================================

[scaleSelf](#Mat23-scaleSelf)(x: number, y: number): Mat23
==========================================================

[mulSelf](#Mat23-mulSelf)(other: Mat23): void
=============================================

[transform](#Mat23-transform)(p: Vec2): Vec2
============================================

[transformPoint](#Mat23-transformPoint)(p: Vec2, o: Vec2): Vec2
===============================================================

[transformVector](#Mat23-transformVector)(v: Vec2, o: Vec2): Vec2
=================================================================

[det](#Mat23-det)(): number
===========================

[inverse](#Mat23-inverse)(): Mat23
==================================

[getTranslation](#Mat23-getTranslation)(): Vec2
===============================================

[getRotation](#Mat23-getRotation)(): number
===========================================

[getScale](#Mat23-getScale)(): Vec2
===================================



[Point](#Point):
================

[pt](#Point-pt): Vec2
=====================

[transform](#Point-transform)(m: Mat23): Point
==============================================

[bbox](#Point-bbox)(): Rect
===========================

[area](#Point-area)(): number
=============================

[clone](#Point-clone)(): Point
==============================

[collides](#Point-collides)(shape: ShapeType): boolean
======================================================

[contains](#Point-contains)(point: Vec2): boolean
=================================================

[raycast](#Point-raycast)(origin: Vec2, direction: Vec2): RaycastResult
=======================================================================

[random](#Point-random)(): Vec2
===============================



[StepPosition](#StepPosition): jump-start | jump-end | jump-none | jump-both
============================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[DrawCurveOpt](#DrawCurveOpt): RenderProps &

[segments](#undefined-segments)?: number
========================================

The amount of line segments to draw.

[width](#undefined-width)?: number
==================================

The width of the line.




========================================================================================================================================================================================================================================================================



[DrawBezierOpt](#DrawBezierOpt): DrawCurveOpt &

[pt1](#undefined-pt1): Vec2
===========================

The first point.

[pt2](#undefined-pt2): Vec2
===========================

The the first control point.

[pt3](#undefined-pt3): Vec2
===========================

The the second control point.

[pt4](#undefined-pt4): Vec2
===========================

The second point.




=========================================================================================================================================================================================================================================================================================================================================================================================



[DrawCircleOpt](#DrawCircleOpt): Omit &

[radius](#undefined-radius): number
===================================

Radius of the circle.

[start](#undefined-start)?: number
==================================

Starting angle.

[fill](#undefined-fill)?: boolean
=================================

If fill the shape with color (set this to false if you only want an outline).

[gradient](#undefined-gradient)?: \[Color, Color\]
==================================================

Use gradient instead of solid color.

`since`v3000.0

[resolution](#undefined-resolution)?: number
============================================

Multiplier for circle vertices resolution (default 1)

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".




============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the circle should look like.



[GfxCtx](#GfxCtx): ReturnType<initGfx\>
=======================================



[Texture](#Texture):
====================

[ctx](#Texture-ctx): GfxCtx
===========================

[src](#Texture-src): null | ImageSource
=======================================

[glTex](#Texture-glTex): WebGLTexture
=====================================

[width](#Texture-width): number
===============================

[height](#Texture-height): number
=================================

[fromImage](#Texture-fromImage)(ctx: GfxCtx, img: ImageSource, opt?: TextureOpt): Texture
=========================================================================================

[update](#Texture-update)(img: ImageSource, x?: number, y?: number): void
=========================================================================

[bind](#Texture-bind)(): void
=============================

[unbind](#Texture-unbind)(): void
=================================

[free](#Texture-free)(): void
=============================

Frees up texture memory. Call this once the texture is no longer being used to avoid memory leaks.



[VertexFormat](#VertexFormat):

[size](#undefined-size): number
===============================

\[\]
=====================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[BatchRenderer](#BatchRenderer):
================================

[ctx](#BatchRenderer-ctx): GfxCtx
=================================

[glVBuf](#BatchRenderer-glVBuf): WebGLBuffer
============================================

[glIBuf](#BatchRenderer-glIBuf): WebGLBuffer
============================================

[vqueue](#BatchRenderer-vqueue): number\[\]
===========================================

[iqueue](#BatchRenderer-iqueue): number\[\]
===========================================

[stride](#BatchRenderer-stride): number
=======================================

[maxVertices](#BatchRenderer-maxVertices): number
=================================================

[maxIndices](#BatchRenderer-maxIndices): number
===============================================

[vertexFormat](#BatchRenderer-vertexFormat): VertexFormat
=========================================================

[numDraws](#BatchRenderer-numDraws): number
===========================================

[curPrimitive](#BatchRenderer-curPrimitive): GLenum | null
==========================================================

[curTex](#BatchRenderer-curTex): Texture | null
===============================================

[curShader](#BatchRenderer-curShader): Shader | null
====================================================

[curUniform](#BatchRenderer-curUniform): Uniform | null
=======================================================

[push](#BatchRenderer-push)(primitive: GLenum, verts: number\[\], indices: number\[\], shader: Shader, tex?: Texture | null, uniform?: Uniform | null): void
============================================================================================================================================================

[flush](#BatchRenderer-flush)(): void
=====================================

[free](#BatchRenderer-free)(): void
===================================



[Mesh](#Mesh):
==============

[ctx](#Mesh-ctx): GfxCtx
========================

[glVBuf](#Mesh-glVBuf): WebGLBuffer
===================================

[glIBuf](#Mesh-glIBuf): WebGLBuffer
===================================

[vertexFormat](#Mesh-vertexFormat): VertexFormat
================================================

[count](#Mesh-count): number
============================

[draw](#Mesh-draw)(primitive?: GLenum): void
============================================

[free](#Mesh-free)(): void
==========================



[initGfx](#initGfx)(gl: WebGLRenderingContext, opts?:

[texFilter](#undefined-texFilter)?: TexFilter
=============================================

):

[gl](#undefined-gl): WebGLRenderingContext
==========================================

[opts](#undefined-opts):

[texFilter](#undefined-texFilter)?: TexFilter
=============================================




=========================================================================================================================

[onDestroy](#undefined-onDestroy)(action: ()\=>unknown): void
=============================================================

[destroy](#undefined-destroy)(): void
=====================================

[pushTexture2D](#undefined-pushTexture2D)(item: WebGLTexture): void
===================================================================

[popTexture2D](#undefined-popTexture2D)(): void
===============================================

[pushArrayBuffer](#undefined-pushArrayBuffer)(item: WebGLBuffer): void
======================================================================

[popArrayBuffer](#undefined-popArrayBuffer)(): void
===================================================

[pushElementArrayBuffer](#undefined-pushElementArrayBuffer)(item: WebGLBuffer): void
====================================================================================

[popElementArrayBuffer](#undefined-popElementArrayBuffer)(): void
=================================================================

[pushFramebuffer](#undefined-pushFramebuffer)(item: WebGLFramebuffer): void
===========================================================================

[popFramebuffer](#undefined-popFramebuffer)(): void
===================================================

[pushRenderbuffer](#undefined-pushRenderbuffer)(item: WebGLRenderbuffer): void
==============================================================================

[popRenderbuffer](#undefined-popRenderbuffer)(): void
=====================================================

[pushViewport](#undefined-pushViewport)(item:

[x](#undefined-x): number
=========================

[y](#undefined-y): number
=========================

[w](#undefined-w): number
=========================

[h](#undefined-h): number
=========================

): void
==========================================================================================================================================================================================================================================================================

[popViewport](#undefined-popViewport)(): void
=============================================

[pushProgram](#undefined-pushProgram)(item: WebGLProgram): void
===============================================================

[popProgram](#undefined-popProgram)(): void
===========================================

[setVertexFormat](#undefined-setVertexFormat)(fmt: VertexFormat): void
======================================================================




=============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[GfxFont](#GfxFont):
====================

[tex](#GfxFont-tex): Texture
============================

[map](#GfxFont-map): Record<string, Quad\>
==========================================

[size](#GfxFont-size): number
=============================



[BitmapFontData](#BitmapFontData): GfxFont
==========================================



[LoadBitmapFontOpt](#LoadBitmapFontOpt):
========================================

[chars](#LoadBitmapFontOpt-chars)?: string
==========================================

[filter](#LoadBitmapFontOpt-filter)?: TexFilter
===============================================

[outline](#LoadBitmapFontOpt-outline)?: number
==============================================



[FontData](#FontData):
======================

[fontface](#FontData-fontface): FontFace
========================================

[filter](#FontData-filter): TexFilter
=====================================

[outline](#FontData-outline): Outline | null
============================================

[size](#FontData-size): number
==============================



[CharTransformFunc](#CharTransformFunc)(idx: number, ch: string): CharTransform
===============================================================================

A function that returns a character transform config. Useful if you're generating dynamic styles.



[FormattedText](#FormattedText):

[width](#undefined-width): number
=================================

[height](#undefined-height): number
===================================

[chars](#undefined-chars): FormattedChar\[\]
============================================

[opt](#undefined-opt): DrawTextOpt
==================================

[renderedText](#undefined-renderedText): string
===============================================




=====================================================================================================================================================================================================================================================================================================================================================================================================================================================

Formatted text with info on how and where to render each character.



[FormattedChar](#FormattedChar):
================================

One formated character.

[ch](#FormattedChar-ch): string
===============================

[tex](#FormattedChar-tex): Texture
==================================

[width](#FormattedChar-width): number
=====================================

[height](#FormattedChar-height): number
=======================================

[quad](#FormattedChar-quad): Quad
=================================

[pos](#FormattedChar-pos): Vec2
===============================

[scale](#FormattedChar-scale): Vec2
===================================

[angle](#FormattedChar-angle): number
=====================================

[color](#FormattedChar-color): Color
====================================

[opacity](#FormattedChar-opacity): number
=========================================



[DrawLineOpt](#DrawLineOpt): Omit &

[p1](#undefined-p1): Vec2
=========================

Starting point of the line.

[p2](#undefined-p2): Vec2
=========================

Ending point of the line.

[width](#undefined-width)?: number
==================================

The width, or thickness of the line,




======================================================================================================================================================================================================================================================================================================================

How the line should look like.



[LineJoin](#LineJoin): none | round | bevel | miter
===================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[LineCap](#LineCap): butt | round | square
==========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[DrawLinesOpt](#DrawLinesOpt): Omit &

[pts](#undefined-pts): Vec2\[\]
===============================

The points that should be connected with a line.

[width](#undefined-width)?: number
==================================

The width, or thickness of the lines,

[radius](#undefined-radius)?: number | number\[\]
=================================================

The radius of each corner.

[join](#undefined-join)?: LineJoin
==================================

Line join style (default "none").

[cap](#undefined-cap)?: LineCap
===============================

Line cap style (default "none").

[miterLimit](#undefined-miterLimit)?: number
============================================

Maximum miter length, anything longer becomes bevel.




=========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the lines should look like.



[DrawRectOpt](#DrawRectOpt): RenderProps &

[width](#undefined-width): number
=================================

Width of the rectangle.

[height](#undefined-height): number
===================================

Height of the rectangle.

[gradient](#undefined-gradient)?: \[Color, Color\]
==================================================

Use gradient instead of solid color.

`since`v3000.0

[horizontal](#undefined-horizontal)?: boolean
=============================================

If the gradient should be horizontal.

`since`v3000.0

[fill](#undefined-fill)?: boolean
=================================

If fill the shape with color (set this to false if you only want an outline).

[radius](#undefined-radius)?: number | number\[\]
=================================================

The radius of each corner.

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".




===========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the rectangle should look like.



[GjkCollisionResult](#GjkCollisionResult):

[normal](#undefined-normal): Vec2
=================================

The direction the first shape needs to be moved to resolve the collision

[distance](#undefined-distance): number
=======================================

The distance the first shape needs to be moved to resolve the collision




=======================================================================================================================================================================================================================================================================================================================================================



[Graph](#Graph):
================

[getNeighbours](#Graph-getNeighbours)(node: number): number\[\]
===============================================================

[getCost](#Graph-getCost)(node: number, neighbor: number): number
=================================================================

[getHeuristic](#Graph-getHeuristic)(node: number, goal: number): number
=======================================================================

[getPath](#Graph-getPath)(from: number, to: number): number\[\]
===============================================================

[getWaypointPath](#Graph-getWaypointPath)(from: Vec2, to: Vec2, opt: any): Vec2\[\]
===================================================================================



[Grid](#Grid):
==============

A grid is a graph consisting of connected grid cells

[\_columns](#Grid-_columns):
============================

[\_rows](#Grid-_rows):
======================

[\_tileWidth](#Grid-_tileWidth):
================================

[\_tileHeight](#Grid-_tileHeight):
==================================

[\_data](#Grid-_data):
======================

[\_diagonals](#Grid-_diagonals):
================================

[\_connMap](#Grid-_connMap):
============================

[\_buildConnectivityMap](#Grid-_buildConnectivityMap):
======================================================

[\_getTile](#Grid-_getTile):
============================

[\_getTileX](#Grid-_getTileX):
==============================

[\_getTileY](#Grid-_getTileY):
==============================

[getNeighbours](#Grid-getNeighbours)(tile: number): number\[\]
==============================================================

[getCost](#Grid-getCost)(a: number, b: number): number
======================================================

[getHeuristic](#Grid-getHeuristic)(a: number, b: number): number
================================================================

[getPath](#Grid-getPath)(start: number, goal: number): number\[\]
=================================================================

[getWaypointPath](#Grid-getWaypointPath)(start: Vec2, goal: Vec2): Vec2\[\]
===========================================================================



[NavEdge](#NavEdge):
====================

[a](#NavEdge-a): Vec2
=====================

[b](#NavEdge-b): Vec2
=====================

[polygon](#NavEdge-polygon): WeakRef<NavPolygon\>
=================================================

[isLeft](#NavEdge-isLeft)(x: number, y: number): number
=======================================================

[middle](#NavEdge-middle)(): Vec2
=================================



[NavPolygon](#NavPolygon):
==========================

[\_edges](#NavPolygon-_edges):
==============================

[\_centroid](#NavPolygon-_centroid):
====================================

[\_id](#NavPolygon-_id):
========================

[id](#NavPolygon-id)(): number
==============================

[edges](#NavPolygon-edges)(edges: NavEdge\[\]):
===============================================

[edges](#NavPolygon-edges)(): NavEdge\[\]
=========================================

[centroid](#NavPolygon-centroid)(): Vec2
========================================

[contains](#NavPolygon-contains)(p: Vec2): boolean
==================================================



[NavMesh](#NavMesh):
====================

[\_polygons](#NavMesh-_polygons):
=================================

[\_pointCache](#NavMesh-_pointCache):
=====================================

[\_edgeCache](#NavMesh-_edgeCache):
===================================

[\_addPoint](#NavMesh-_addPoint):
=================================

[\_addEdge](#NavMesh-_addEdge):
===============================

[\_findEdge](#NavMesh-_findEdge):
=================================

[\_findCommonEdge](#NavMesh-_findCommonEdge):
=============================================

[addPolygon](#NavMesh-addPolygon)(vertices: Vec2\[\]): NavPolygon
=================================================================

[addRect](#NavMesh-addRect)(pos: Vec2, size: Vec2): NavPolygon
==============================================================

[\_getLocation](#NavMesh-_getLocation):
=======================================

[getNeighbours](#NavMesh-getNeighbours)(index: number): number\[\]
==================================================================

[getCost](#NavMesh-getCost)(a: number, b: number): number
=========================================================

[getHeuristic](#NavMesh-getHeuristic)(indexA: number, indexB: number): number
=============================================================================

[getPath](#NavMesh-getPath)(start: number, goal: number): number\[\]
====================================================================

[getWaypointPath](#NavMesh-getWaypointPath)(start: Vec2, goal: Vec2, opt: any): Vec2\[\]
========================================================================================



[SatResult](#SatResult):

[normal](#undefined-normal): Vec2
=================================

[distance](#undefined-distance): number
=======================================




==================================================================================================================================================================================



[EmitterOpt](#EmitterOpt):

[shape](#undefined-shape)?: ShapeType
=====================================

Shape of the emitter. If given, particles spawn within this shape.

[lifetime](#undefined-lifetime)?: number
========================================

Lifetime of the emitter.

[rate](#undefined-rate)?: number
================================

Rate of emission in particles per second if the emitter should emit out of itself.

[position](#undefined-position): Vec2
=====================================

Position (relative) of emission.

[direction](#undefined-direction): number
=========================================

Direction of emission.

[spread](#undefined-spread): number
===================================

Spread (cone) of emission around the direction.




=========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

Options for the particles`particles()`'s component



[Registry](#Registry)<T\>:
==========================

[lastID](#Registry-lastID):
===========================

[push](#Registry-push)(v: T): number
====================================

[pushd](#Registry-pushd)(v: T): void
====================================



[KEvent](#KEvent)<Args\>:
=========================

[cancellers](#KEvent-cancellers):
=================================

[handlers](#KEvent-handlers):
=============================

[add](#KEvent-add)(action: (args: Args)\=>unknown): KEventController
====================================================================

[addOnce](#KEvent-addOnce)(action: (args: Args | PromiseLike\[\])\=>void): KEventController
===========================================================================================

[next](#KEvent-next)(): Promise<Args\>
======================================

[trigger](#KEvent-trigger)(args: Args): void
============================================

[numListeners](#KEvent-numListeners)(): number
==============================================

[clear](#KEvent-clear)(): void
==============================



[KEventHandler](#KEventHandler)<EventMap\>:
===========================================

[handlers](#KEventHandler-handlers):
====================================

[registers](#KEventHandler-registers): Partial<MappedType\>
===========================================================

[on](#KEventHandler-on)<Name\>(name: Name, action: (args: EventMap\[Name\])\=>void): KEventController
=====================================================================================================

[onOnce](#KEventHandler-onOnce)<Name\>(name: Name, action: (args: EventMap\[Name\])\=>void): KEventController
=============================================================================================================

[next](#KEventHandler-next)<Name\>(name: Name): Promise<unknown\>
=================================================================

[trigger](#KEventHandler-trigger)<Name\>(name: Name, args: EventMap\[Name\]): void
==================================================================================

[remove](#KEventHandler-remove)<Name\>(name: Name): void
========================================================

[clear](#KEventHandler-clear)(): void
=====================================

[numListeners](#KEventHandler-numListeners)<Name\>(name: Name): number
======================================================================



[BinaryHeap](#BinaryHeap)<T\>:
==============================

[\_items](#BinaryHeap-_items): T\[\]
====================================

[\_compareFn](#BinaryHeap-_compareFn)(a: T, b: T): boolean
==========================================================

[insert](#BinaryHeap-insert)(item: T): void
===========================================

Insert an item into the binary heap

[remove](#BinaryHeap-remove)(): T | null
========================================

Remove the smallest item from the binary heap in case of a min heap or the greatest item from the binary heap in case of a max heap

[clear](#BinaryHeap-clear)(): void
==================================

Remove all items

[moveUp](#BinaryHeap-moveUp)(pos: number): void
===============================================

[moveDown](#BinaryHeap-moveDown)(pos: number): void
===================================================

[swap](#BinaryHeap-swap)(index1: number, index2: number): void
==============================================================

[length](#BinaryHeap-length)(): number
======================================

Returns the amount of items



[PathfinderMapComp](#PathfinderMapComp):
========================================

[navigate](#PathfinderMapComp-navigate)(origin: Vec2, target: Vec2, navigationOpt: any): Vec2\[\] | undefined
=============================================================================================================

Get navigation waypoints to reach the given target from the given origin.

[graph](#PathfinderMapComp-graph): Graph | undefined
====================================================

The graph to use for navigation.



[PathfinderMapCompOpt](#PathfinderMapCompOpt):
==============================================

[graph](#PathfinderMapCompOpt-graph)?: Graph
============================================

The graph to use for navigation. If null, the ancestors are queried for a pathfinderMap component.



[PathfinderComp](#PathfinderComp):
==================================

[navigateTo](#PathfinderComp-navigateTo)(target: Vec2): Vec2\[\] | undefined
============================================================================

Get navigation waypoints to reach the given target from the current position.

[graph](#PathfinderComp-graph): Graph | undefined
=================================================

Get the graph used for navigastion if any.



[PathfinderCompOpt](#PathfinderCompOpt):
========================================

[graph](#PathfinderCompOpt-graph)?: Graph
=========================================

The graph to use for navigation. If null, the ancestors are queried for a pathfinderMap component.

[navigationOpt](#PathfinderCompOpt-navigationOpt)?: any
=======================================================

The navigation options depending on the kind of graph used.



[PatrolComp](#PatrolComp):
==========================

[waypoints](#PatrolComp-waypoints): Vec2\[\] | undefined
========================================================

Path to follow. If null, doesn't move.

[patrolSpeed](#PatrolComp-patrolSpeed): number
==============================================

Speed of the movement during patrol.

[nextLocation](#PatrolComp-nextLocation): Vec2 | undefined
==========================================================

Current subgoal, if any.

[onPatrolFinished](#PatrolComp-onPatrolFinished)(cb: (objects: GameObj\[\])\=>void): KEventController
=====================================================================================================

Attaches an event handler which is called when using "stop" and the end of the path is reached.

`param`cbThe event handler called when the patrol finishes.



[PatrolEndBehavior](#PatrolEndBehavior): loop | ping-pong | stop
================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[PatrolCompOpt](#PatrolCompOpt):
================================

[waypoints](#PatrolCompOpt-waypoints)?: Vec2\[\]
================================================

Path to follow. If null, starts suspended.

[speed](#PatrolCompOpt-speed)?: number
======================================

Speed of the movement during patrol.

[endBehavior](#PatrolCompOpt-endBehavior)?: PatrolEndBehavior
=============================================================

What to do after the last waypoint has been reached.



[SentryCandidatesCb](#SentryCandidatesCb)(): GameObj\[\]
========================================================



[SentryCandidates](#SentryCandidates): SentryCandidatesCb | QueryOpt
====================================================================



[TimeDirection](#TimeDirection): forward | reverse | ping-pong
==============================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Interpolation](#Interpolation): none | linear | slerp | spline
===============================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[AnimateOpt](#AnimateOpt):
==========================

[duration](#AnimateOpt-duration): number
========================================

Duration of the animation in seconds

[loops](#AnimateOpt-loops)?: number
===================================

Loops, Default is undefined aka infinite

[direction](#AnimateOpt-direction)?: TimeDirection
==================================================

Behavior when reaching the end of the animation. Default is forward.

[easing](#AnimateOpt-easing)?: EaseFunc
=======================================

Easing function. Default is linear time.

[interpolation](#AnimateOpt-interpolation)?: Interpolation
==========================================================

Interpolation function. Default is linear interpolation.

[timing](#AnimateOpt-timing)?: number\[\]
=========================================

Timestamps in percent for the given keys, if omitted, keys are equally spaced.

[easings](#AnimateOpt-easings)?: EaseFunc\[\]
=============================================

Easings for the given keys, if omitted, easing is used.



[AnimateCompOpt](#AnimateCompOpt):
==================================

[followMotion](#AnimateCompOpt-followMotion)?: boolean
======================================================

Changes the angle so it follows the motion, requires the rotate component

[relative](#AnimateCompOpt-relative)?: boolean
==============================================

The animation is added to the base values of pos, angle, scale and opacity instead of replacing them

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[BaseValues](#BaseValues):
==========================

[pos](#BaseValues-pos): Vec2
============================

[angle](#BaseValues-angle): number
==================================

[scale](#BaseValues-scale): Vec2
================================

[opacity](#BaseValues-opacity): number
======================================



[AnimateComp](#AnimateComp):
============================

[animate](#AnimateComp-animate)<T\>(name: string, keys: T\[\], opts: AnimateOpt): void
======================================================================================

Animates a property on this object.

`param`nameName of the property to animate.

`param`keysKeys determining the value at a certain point in time.

`param`optsOptions.

[unanimate](#AnimateComp-unanimate)(name: string): void
=======================================================

Removes the animation from the given property.

`param`nameName of the property to remove the animation from.

[unanimateAll](#AnimateComp-unanimateAll)(): void
=================================================

Removes the animations from all properties

[onAnimateFinished](#AnimateComp-onAnimateFinished)(cb: ()\=>void): KEventController
====================================================================================

Attaches an event handler which is called when all the animation channels have finished.

`param`cbThe event handler called when the animation finishes.

[onAnimateChannelFinished](#AnimateComp-onAnimateChannelFinished)(cb: (name: string)\=>void): KEventController
==============================================================================================================

Attaches an event handler which is called when an animation channels has finished.

`param`cbThe event handler called when an animation channel finishes.

[base](#AnimateComp-base): BaseValues
=====================================

Base values for relative animation

[animation](#AnimateComp-animation):

[paused](#undefined-paused): boolean
====================================

Pauses playing

[seek](#undefined-seek)(time: number): void
===========================================

Move the animation to a specific point in time

[duration](#undefined-duration): number
=======================================

Returns the duration of the animation




====================================================================================================================================================================================================================================================================================================================================================================================================

[serializeAnimationChannels](#AnimateComp-serializeAnimationChannels)(): Record<string, AnimationChannel\>
==========================================================================================================

[serializeAnimationOptions](#AnimateComp-serializeAnimationOptions)():

[followMotion](#undefined-followMotion)?: boolean
=================================================

[relative](#undefined-relative)?: boolean
=========================================




====================================================================================================================================================================================================================================================================

Serializes the options of this object to plain Javascript types



[AnimationChannelKeys](#AnimationChannelKeys): number\[\] | number\[\]\[\]
==========================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[AnimationOptions](#AnimationOptions):

[duration](#undefined-duration): number
=======================================

[loops](#undefined-loops)?: number
==================================

[direction](#undefined-direction)?: TimeDirection
=================================================

[easing](#undefined-easing)?: string
====================================

[interpolation](#undefined-interpolation)?: Interpolation
=========================================================

[timing](#undefined-timing)?: number\[\]
========================================

[easings](#undefined-easings)?: string\[\]
==========================================




=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[AnimationChannel](#AnimationChannel):[keys](#undefined-keys): AnimationChannelKeys
=============================================

& AnimationOptions
=====================================================================================================================================================



[FakeMouseComp](#FakeMouseComp):
================================

The fakeMouse`fakeMouse()` component.

[isPressed](#FakeMouseComp-isPressed)(): boolean
================================================

Whether the fake mouse is pressed.

[press](#FakeMouseComp-press)(): void
=====================================

Trigger press (onClick).

[release](#FakeMouseComp-release)(): void
=========================================

Trigger release.

[onPress](#FakeMouseComp-onPress)(action: ()\=>void): void
==========================================================

Register an event that runs when the fake mouse performs a click.

[onRelease](#FakeMouseComp-onRelease)(action: ()\=>void): void
==============================================================

Register an event that runs when the fake mouse releases.



[FakeMouseOpt](#FakeMouseOpt):

[followMouse](#undefined-followMouse)?: boolean
===============================================

Whether the fake mouse should follow the real mouse. Defaults to \`true\`.




===============================================================================================================================================================================================================

Options for the fakeMouse`fakeMouse()` component.



[SurfaceEffectorCompOpt](#SurfaceEffectorCompOpt):

[speed](#undefined-speed): number
=================================

[speedVariation](#undefined-speedVariation)?: number
====================================================

[forceScale](#undefined-forceScale)?: number
============================================




=================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SurfaceEffectorComp](#SurfaceEffectorComp):
============================================

[speed](#SurfaceEffectorComp-speed): number
===========================================

[speedVariation](#SurfaceEffectorComp-speedVariation): number
=============================================================

[forceScale](#SurfaceEffectorComp-forceScale): number
=====================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[AreaEffectorCompOpt](#AreaEffectorCompOpt):

[useGlobalAngle](#undefined-useGlobalAngle)?: boolean
=====================================================

[force](#undefined-force): Vec2
===============================

[linearDrag](#undefined-linearDrag)?: number
============================================




=========================================================================================================================================================================================================================================================================================================================



[AreaEffectorComp](#AreaEffectorComp):
======================================

[useGlobalAngle](#AreaEffectorComp-useGlobalAngle): boolean
===========================================================

[force](#AreaEffectorComp-force): Vec2
======================================

[linearDrag](#AreaEffectorComp-linearDrag): number
==================================================



[ForceMode](#ForceMode): constant | inverseLinear | inverseSquared
==================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[PointEffectorCompOpt](#PointEffectorCompOpt):

[forceMagnitude](#undefined-forceMagnitude): number
===================================================

[distanceScale](#undefined-distanceScale)?: number
==================================================

[forceMode](#undefined-forceMode)?: ForceMode
=============================================

[linearDrag](#undefined-linearDrag)?: number
============================================




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================



[PointEffectorComp](#PointEffectorComp):
========================================

[forceMagnitude](#PointEffectorComp-forceMagnitude): number
===========================================================

[distanceScale](#PointEffectorComp-distanceScale): number
=========================================================

[forceMode](#PointEffectorComp-forceMode): ForceMode
====================================================

[linearDrag](#PointEffectorComp-linearDrag): number
===================================================



[ConstantForceCompOpt](#ConstantForceCompOpt):

[force](#undefined-force)?: Vec2
================================

[useGlobalAngle](#undefined-useGlobalAngle)?: boolean
=====================================================




==================================================================================================================================================================================================================================



[ConstantForceComp](#ConstantForceComp):
========================================

[force](#ConstantForceComp-force): Vec2 | undefined
===================================================

[useGlobalAngle](#ConstantForceComp-useGlobalAngle): boolean
============================================================



[PlatformEffectorCompOpt](#PlatformEffectorCompOpt):

[ignoreSides](#undefined-ignoreSides)?: Vec2\[\]
================================================

If the object is about to collide and the collision normal direction is in here, the object won't collide. Should be a list of unit vectors \`LEFT\`, \`RIGHT\`, \`UP\`, or \`DOWN\`.

[shouldCollide](#undefined-shouldCollide)?(this: GameObj, obj: GameObj, normal: Vec2): boolean
==============================================================================================

A function that determines whether the object should collide. If present, it overrides the \`ignoreSides\`; if absent, it is automatically created from \`ignoreSides\`.




===========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[PlatformEffectorComp](#PlatformEffectorComp):
==============================================

[platformIgnore](#PlatformEffectorComp-platformIgnore): Set<GameObj\>
=====================================================================

A set of the objects that should not collide with this, because \`shouldCollide\` returned true. Objects in here are automatically removed when they stop colliding, so the casual user shouldn't need to touch this much. However, if an object is added to this set before the object collides with the platform effector, it won't collide even if \`shouldCollide\` returns true.



[BuoyancyEffectorCompOpt](#BuoyancyEffectorCompOpt):

[surfaceLevel](#undefined-surfaceLevel): number
===============================================

[density](#undefined-density)?: number
======================================

[linearDrag](#undefined-linearDrag)?: number
============================================

[angularDrag](#undefined-angularDrag)?: number
==============================================

[flowAngle](#undefined-flowAngle)?: number
==========================================

[flowMagnitude](#undefined-flowMagnitude)?: number
==================================================

[flowVariation](#undefined-flowVariation)?: number
==================================================




=======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[BuoyancyEffectorComp](#BuoyancyEffectorComp):
==============================================

[surfaceLevel](#BuoyancyEffectorComp-surfaceLevel): number
==========================================================

[density](#BuoyancyEffectorComp-density): number
================================================

[linearDrag](#BuoyancyEffectorComp-linearDrag): number
======================================================

[angularDrag](#BuoyancyEffectorComp-angularDrag): number
========================================================

[flowAngle](#BuoyancyEffectorComp-flowAngle): number
====================================================

[flowMagnitude](#BuoyancyEffectorComp-flowMagnitude): number
============================================================

[flowVariation](#BuoyancyEffectorComp-flowVariation): number
============================================================

[applyBuoyancy](#BuoyancyEffectorComp-applyBuoyancy)(body: GameObj, submergedArea: Polygon): void
=================================================================================================

[applyDrag](#BuoyancyEffectorComp-applyDrag)(body: GameObj, submergedArea: Polygon): void
=========================================================================================



[Vec3](#Vec3):
==============

[x](#Vec3-x): number
====================

[y](#Vec3-y): number
====================

[z](#Vec3-z): number
====================

[dot](#Vec3-dot)(other: Vec3): number
=====================================

[cross](#Vec3-cross)(other: Vec3): Vec3
=======================================



[DrawSpriteOpt](#DrawSpriteOpt): RenderProps &

[sprite](#undefined-sprite): string | SpriteData | Asset
========================================================

The sprite name in the asset manager, or the raw sprite data.

[frame](#undefined-frame)?: number
==================================

If the sprite is loaded with multiple frames, or sliced, use the frame option to specify which frame to draw.

[width](#undefined-width)?: number
==================================

Width of sprite. If \`height\` is not specified it'll stretch with aspect ratio. If \`tiled\` is set to true it'll tiled to the specified width horizontally.

[height](#undefined-height)?: number
====================================

Height of sprite. If \`width\` is not specified it'll stretch with aspect ratio. If \`tiled\` is set to true it'll tiled to the specified width vertically.

[tiled](#undefined-tiled)?: boolean
===================================

When set to true, \`width\` and \`height\` will not scale the sprite but instead render multiple tiled copies of them until the specified width and height. Useful for background texture pattern etc.

[flipX](#undefined-flipX)?: boolean
===================================

If flip the texture horizontally.

[flipY](#undefined-flipY)?: boolean
===================================

If flip the texture vertically.

[quad](#undefined-quad)?: Quad
==============================

The sub-area to render from the texture, by default it'll render the whole \`quad(0, 0, 1, 1)\`

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".

[pos](#undefined-pos)?: Vec2
============================

The position




==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the sprite should look like.



[DrawTriangleOpt](#DrawTriangleOpt): RenderProps &

[p1](#undefined-p1): Vec2
=========================

First point of triangle.

[p2](#undefined-p2): Vec2
=========================

Second point of triangle.

[p3](#undefined-p3): Vec2
=========================

Third point of triangle.

[fill](#undefined-fill)?: boolean
=================================

If fill the shape with color (set this to false if you only want an outline).

[radius](#undefined-radius)?: number
====================================

The radius of each corner.




===============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the triangle should look like.



[ShaderData](#ShaderData): Shader
=================================



[AppGfxCtx](#AppGfxCtx): ReturnType<initAppGfx\>
================================================



[TexPacker](#TexPacker):
========================

[lastTextureId](#TexPacker-lastTextureId):
==========================================

[textures](#TexPacker-textures):
================================

[bigTextures](#TexPacker-bigTextures):
======================================

[texturesPosition](#TexPacker-texturesPosition):
================================================

[canvas](#TexPacker-canvas):
============================

[c2d](#TexPacker-c2d):
======================

[x](#TexPacker-x):
==================

[y](#TexPacker-y):
==================

[curHeight](#TexPacker-curHeight):
==================================

[gfx](#TexPacker-gfx):
======================

[add](#TexPacker-add)(img: ImageSource): \[Texture, Quad, number\]
==================================================================

[free](#TexPacker-free)(): void
===============================

[remove](#TexPacker-remove)(packerId: number): void
===================================================



[SoundData](#SoundData):
========================

[buf](#SoundData-buf): AudioBuffer
==================================

[fromAudioBuffer](#SoundData-fromAudioBuffer)(buf: AudioBuffer): SoundData
==========================================================================

[fromArrayBuffer](#SoundData-fromArrayBuffer)(buf: ArrayBuffer): Promise<SoundData\>
====================================================================================

[fromURL](#SoundData-fromURL)(url: string): Promise<SoundData\>
===============================================================



[SpriteAnim](#SpriteAnim): number |

[from](#undefined-from): number
===============================

The starting frame.

[to](#undefined-to): number
===========================

The end frame.

[loop](#undefined-loop)?: boolean
=================================

If this anim should be played in loop.

[pingpong](#undefined-pingpong)?: boolean
=========================================

When looping should it move back instead of go to start frame again.

[speed](#undefined-speed)?: number
==================================

This anim's speed in frames per second.




==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

Frame-based animation configuration.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SpriteAnims](#SpriteAnims): Record<string, SpriteAnim\>
========================================================

A dict of name <-> animation.



[LoadSpriteOpt](#LoadSpriteOpt):
================================

Sprite loading configuration.

[sliceX](#LoadSpriteOpt-sliceX)?: number
========================================

If the defined area contains multiple sprites, how many frames are in the area horizontally.

[sliceY](#LoadSpriteOpt-sliceY)?: number
========================================

If the defined area contains multiple sprites, how many frames are in the area vertically.

[slice9](#LoadSpriteOpt-slice9)?: NineSlice
===========================================

9 slice sprite for proportional scaling.

`since`v3000.0

[frames](#LoadSpriteOpt-frames)?: Quad\[\]
==========================================

Individual frames.

`since`v3000.0

[anims](#LoadSpriteOpt-anims)?: SpriteAnims
===========================================

Animation configuration.



[NineSlice](#NineSlice):

[left](#undefined-left): number
===============================

The width of the 9-slice's left column.

[right](#undefined-right): number
=================================

The width of the 9-slice's right column.

[top](#undefined-top): number
=============================

The height of the 9-slice's top row.

[bottom](#undefined-bottom): number
===================================

The height of the 9-slice's bottom row.




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[LoadSpriteSrc](#LoadSpriteSrc): string | ImageSource
=====================================================



[SpriteData](#SpriteData):
==========================

[tex](#SpriteData-tex): Texture
===============================

[frames](#SpriteData-frames): Quad\[\]
======================================

[anims](#SpriteData-anims): SpriteAnims
=======================================

[slice9](#SpriteData-slice9): NineSlice | null
==============================================

[packerId](#SpriteData-packerId): number | null
===============================================

[width](#SpriteData-width)(): number
====================================

`since`v3001.0

[height](#SpriteData-height)(): number
======================================

[from](#SpriteData-from)(src: LoadSpriteSrc, opt?: LoadSpriteOpt): Promise<SpriteData\>
=======================================================================================

[fromImage](#SpriteData-fromImage)(data: ImageSource, opt?: LoadSpriteOpt): SpriteData
======================================================================================

[fromURL](#SpriteData-fromURL)(url: string, opt?: LoadSpriteOpt): Promise<SpriteData\>
======================================================================================



[Asset](#Asset)<D\>:
====================

An asset is a resource that is loaded asynchronously. It can be a sprite, a sound, a font, a shader, etc.

[loaded](#Asset-loaded): boolean
================================

[loaded](#Asset-loaded)<D\>(data: D): Asset<D\>
===============================================

[data](#Asset-data): D | null
=============================

[error](#Asset-error): Error | null
===================================

[onLoadEvents](#Asset-onLoadEvents):
====================================

[onErrorEvents](#Asset-onErrorEvents):
======================================

[onFinishEvents](#Asset-onFinishEvents):
========================================

[onLoad](#Asset-onLoad)(action: (data: D)\=>void): this
=======================================================

[onError](#Asset-onError)(action: (err: Error)\=>void): this
============================================================

[onFinish](#Asset-onFinish)(action: ()\=>void): this
====================================================

[then](#Asset-then)(action: (data: D)\=>void): Asset<D\>
========================================================

[catch](#Asset-catch)(action: (err: Error)\=>void): Asset<D\>
=============================================================

[finally](#Asset-finally)(action: ()\=>void): Asset<D\>
=======================================================



[AssetBucket](#AssetBucket)<D\>:
================================

[assets](#AssetBucket-assets): Map<string, Asset\>
==================================================

[lastUID](#AssetBucket-lastUID): number
=======================================

[add](#AssetBucket-add)(name: string | null, loader: Promise): Asset<D\>
========================================================================

[addLoaded](#AssetBucket-addLoaded)(name: string | null, data: D): Asset<D\>
============================================================================

[get](#AssetBucket-get)(handle: string): Asset | undefined
==========================================================

[progress](#AssetBucket-progress)(): number
===========================================

[getFailedAssets](#AssetBucket-getFailedAssets)(): \[string, Asset\]\[\]
========================================================================



[AssetsCtx](#AssetsCtx): ReturnType<initAssets\>
================================================



[AsepriteData](#AsepriteData):

[frames](#undefined-frames): Array<

[frame](#undefined-frame):

[x](#undefined-x): number
=========================

[y](#undefined-y): number
=========================

[w](#undefined-w): number
=========================

[h](#undefined-h): number
=========================




==================================================================================================================================================================================================================================================

\>
==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

[meta](#undefined-meta):

[size](#undefined-size):

[w](#undefined-w): number
=========================

[h](#undefined-h): number
=========================




======================================================================================================================================

[frameTags](#undefined-frameTags): Array<

[from](#undefined-from): number
===============================

[to](#undefined-to): number
===========================

[direction](#undefined-direction): forward | reverse | pingpong
===============================================================

\>
========================================================================================================================================================================================================================================================================================================




==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================




================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[PeditFile](#PeditFile):
========================

[width](#PeditFile-width): number
=================================

[height](#PeditFile-height): number
===================================

[frames](#PeditFile-frames): string\[\]
=======================================

[anims](#PeditFile-anims): SpriteAnims
======================================



[SpriteAtlasData](#SpriteAtlasData): Record<string, SpriteAtlasEntry\>
======================================================================



[SpriteAtlasEntry](#SpriteAtlasEntry): LoadSpriteOpt &

[x](#undefined-x): number
=========================

X position of the top left corner.

[y](#undefined-y): number
=========================

Y position of the top left corner.

[width](#undefined-width): number
=================================

Sprite area width.

[height](#undefined-height): number
===================================

Sprite area height.




===================================================================================================================================================================================================================================================================================================================================================================================================================================

A sprite in a sprite atlas.



[AudioCtx](#AudioCtx): ReturnType<initAudio\>
=============================================



[AudioPlayOpt](#AudioPlayOpt):
==============================

Audio play configurations.

[paused](#AudioPlayOpt-paused)?: boolean
========================================

If audio should start out paused.

`since`v3000.0

[loop](#AudioPlayOpt-loop)?: boolean
====================================

If audio should be played again from start when its ended.

[volume](#AudioPlayOpt-volume)?: number
=======================================

Volume of audio. 1.0 means full volume, 0.5 means half volume.

[speed](#AudioPlayOpt-speed)?: number
=====================================

Playback speed. 1.0 means normal playback speed, 2.0 means twice as fast.

[detune](#AudioPlayOpt-detune)?: number
=======================================

Detune the sound. Every 100 means a semitone.

    // play a random note in the octave
    play("noteC", {
        detune: randi(0, 12) * 100,
    })


[seek](#AudioPlayOpt-seek)?: number
===================================

The start time, in seconds.

[pan](#AudioPlayOpt-pan)?: number
=================================

The stereo pan of the sound. -1.0 means fully from the left channel, 0.0 means centered, 1.0 means fully right. Defaults to 0.0.

[connectTo](#AudioPlayOpt-connectTo)?: AudioNode
================================================

If the audio node should start out connected to another audio node rather than KAPLAY's default volume node. Defaults to undefined, i.e. use KAPLAY's volume node.



[AudioPlay](#AudioPlay):
========================

[play](#AudioPlay-play)(time?: number): void
============================================

Start playing audio.

`since`v3000.0

[seek](#AudioPlay-seek)(time: number): void
===========================================

Seek time.

`since`v3000.0

[stop](#AudioPlay-stop)(): void
===============================

Stop the sound.

`since`v3001.0

[paused](#AudioPlay-paused): boolean
====================================

If the sound is paused.

`since`v2000.1

[speed](#AudioPlay-speed): number
=================================

Playback speed of the sound. 1.0 means normal playback speed, 2.0 means twice as fast.

[detune](#AudioPlay-detune): number
===================================

Detune the sound. Every 100 means a semitone.

    // tune down a semitone
    music.detune = -100

    // tune up an octave
    music.detune = 1200


[volume](#AudioPlay-volume): number
===================================

Volume of the sound. 1.0 means full volume, 0.5 means half volume.

[pan](#AudioPlay-pan)?: number
==============================

The stereo pan of the sound. -1.0 means fully from the left channel, 0.0 means centered, 1.0 means fully right. Defaults to 0.0.

[loop](#AudioPlay-loop): boolean
================================

If the audio should start again when it ends.

[time](#AudioPlay-time)(): number
=================================

The current playing time (not accurate if speed is changed).

[duration](#AudioPlay-duration)(): number
=========================================

The total duration.

[onEnd](#AudioPlay-onEnd)(action: ()\=>void): KEventController
==============================================================

Register an event that runs when audio ends.

`since`v3000.0

[then](#AudioPlay-then)(action: ()\=>void): KEventController
============================================================

[connect](#AudioPlay-connect)(node?: AudioNode): void
=====================================================

Disconnect the audio node from whatever it is currently connected to and connect it to the passed-in audio node, or to Kaplay's default volume node if no node is passed.



[GameObjEvents](#GameObjEvents): GameObjEventMap &
==================================================



[GameObjEventNames](#GameObjEventNames): GameObjEventMap
========================================================



[AppEventMap](#AppEventMap):

[mouseMove](#undefined-mouseMove): \[\]
=======================================

[mouseDown](#undefined-mouseDown): \[MouseButton\]
==================================================

[mousePress](#undefined-mousePress): \[MouseButton\]
====================================================

[mouseRelease](#undefined-mouseRelease): \[MouseButton\]
========================================================

[charInput](#undefined-charInput): \[string\]
=============================================

[keyPress](#undefined-keyPress): \[Key\]
========================================

[keyDown](#undefined-keyDown): \[Key\]
======================================

[keyPressRepeat](#undefined-keyPressRepeat): \[Key\]
====================================================

[keyRelease](#undefined-keyRelease): \[Key\]
============================================

[touchStart](#undefined-touchStart): \[Vec2, Touch\]
====================================================

[touchMove](#undefined-touchMove): \[Vec2, Touch\]
==================================================

[touchEnd](#undefined-touchEnd): \[Vec2, Touch\]
================================================

[gamepadButtonDown](#undefined-gamepadButtonDown): \[KGamepadButton, KGamepad\]
===============================================================================

[gamepadButtonPress](#undefined-gamepadButtonPress): \[KGamepadButton, KGamepad\]
=================================================================================

[gamepadButtonRelease](#undefined-gamepadButtonRelease): \[KGamepadButton, KGamepad\]
=====================================================================================

[gamepadStick](#undefined-gamepadStick): \[string, Vec2, KGamepad\]
===================================================================

[gamepadConnect](#undefined-gamepadConnect): \[KGamepad\]
=========================================================

[gamepadDisconnect](#undefined-gamepadDisconnect): \[KGamepad\]
===============================================================

[buttonDown](#undefined-buttonDown): \[string\]
===============================================

[buttonPress](#undefined-buttonPress): \[string\]
=================================================

[buttonRelease](#undefined-buttonRelease): \[string\]
=====================================================

[scroll](#undefined-scroll): \[Vec2\]
=====================================

[hide](#undefined-hide): \[\]
=============================

[show](#undefined-show): \[\]
=============================

[resize](#undefined-resize): \[\]
=================================

[input](#undefined-input): \[\]
===============================




==================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

App events with their arguments



[TupleWithoutFirst](#TupleWithoutFirst)<T\>: ConditionalType
============================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SceneName](#SceneName): string
===============================

The name of a scene.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SceneDef](#SceneDef)(args: any): void
======================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Game](#Game): ReturnType<initGame\>
====================================



[KeepFlags](#KeepFlags):
========================

[Pos](#KeepFlags-Pos):
======================

[Angle](#KeepFlags-Angle):
==========================

[Scale](#KeepFlags-Scale):
==========================

[All](#KeepFlags-All):
======================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SetParentOpt](#SetParentOpt):

[keep](#undefined-keep): KeepFlags
==================================




=========================================================================================================



[System](#System):

[run](#undefined-run)(): void
=============================

[when](#undefined-when): LCEvents\[\]
=====================================




================================================================================================================================================================



[LCEvents](#LCEvents):
======================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[KAPLAYInternal](#KAPLAYInternal):

[k](#undefined-k): KAPLAYCtx
============================

[globalOpt](#undefined-globalOpt): KAPLAYOpt
============================================

[gfx](#undefined-gfx): AppGfxCtx
================================

[game](#undefined-game): Game
=============================

[app](#undefined-app): App
==========================

[assets](#undefined-assets): ReturnType<initAssets\>
====================================================

[fontCacheCanvas](#undefined-fontCacheCanvas): HTMLCanvasElement | null
=======================================================================

[fontCacheC2d](#undefined-fontCacheC2d): CanvasRenderingContext2D | null
========================================================================

[debug](#undefined-debug): Debug
================================

[audio](#undefined-audio): AudioCtx
===================================

[pixelDensity](#undefined-pixelDensity): number
===============================================

[canvas](#undefined-canvas): HTMLCanvasElement
==============================================

[gscale](#undefined-gscale): number
===================================

[kaSprite](#undefined-kaSprite): Asset<SpriteData\>
===================================================

[boomSprite](#undefined-boomSprite): Asset<SpriteData\>
=======================================================

[systems](#undefined-systems): System\[\]
=========================================

[systemsByEvent](#undefined-systemsByEvent): System\[\]\[\]
===========================================================




===============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

Sensitive KAPLAY data



[\_k](#_k): KAPLAYInternal
==========================

Internal data that should not be accessed directly.

`readonly`



[addKaboom](#addKaboom)(pos: Vec2, opt?: BoomOpt): GameObj
==========================================================

Add an explosion effect.

`param`pos\- The position of the explosion.

`param`opt\- The options for the explosion.

    onMousePress(() => {
        addKaboom(mousePos());
    });

`returns`The explosion object.

`since`v2000.0



[Tag](#Tag): string
===================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[UnionToIntersection](#UnionToIntersection)<U\>: ConditionalType
================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Defined](#Defined)<T\>: ConditionalType
========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Expand](#Expand)<T\>: ConditionalType
======================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[MergeObj](#MergeObj)<T\>: Expand<UnionToIntersection\>
=======================================================



[MergePlugins](#MergePlugins)<T\>: MergeObj<ReturnType\>
========================================================



[PluginList](#PluginList)<T\>: Array<T | KAPLAYPlugin\>
=======================================================



[GamepadDef](#GamepadDef):

[buttons](#undefined-buttons): Record<string, KGamepadButton\>
==============================================================

[sticks](#undefined-sticks): Partial<Record\>
=============================================




==========================================================================================================================================================================================================================================================

A gamepad definition.



[KGamepad](#KGamepad):

[index](#undefined-index): number
=================================

The order of the gamepad in the gamepad list.

[isPressed](#undefined-isPressed)(b: KGamepadButton): boolean
=============================================================

If certain button is pressed.

[isDown](#undefined-isDown)(b: KGamepadButton): boolean
=======================================================

If certain button is held down.

[isReleased](#undefined-isReleased)(b: KGamepadButton): boolean
===============================================================

If certain button is released.

[getStick](#undefined-getStick)(stick: GamepadStick): Vec2
==========================================================

Get the value of a stick.




===============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

A KAPLAY gamepad



[GameObjInspect](#GameObjInspect): Record<Tag, string | null\>
==============================================================

Inspect info for a game object.



[SpriteAnimPlayOpt](#SpriteAnimPlayOpt):
========================================

Sprite animation configuration when playing.

[loop](#SpriteAnimPlayOpt-loop)?: boolean
=========================================

If this anim should be played in loop.

[pingpong](#SpriteAnimPlayOpt-pingpong)?: boolean
=================================================

When looping should it move back instead of go to start frame again.

[speed](#SpriteAnimPlayOpt-speed)?: number
==========================================

This anim's speed in frames per second.

[onEnd](#SpriteAnimPlayOpt-onEnd)?(): void
==========================================

Runs when this animation ends.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[MusicData](#MusicData): string
===============================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[LoadFontOpt](#LoadFontOpt):
============================

[filter](#LoadFontOpt-filter)?: TexFilter
=========================================

[outline](#LoadFontOpt-outline)?: number | Outline
==================================================

[size](#LoadFontOpt-size)?: number
==================================

The size to load the font in (default 64).

`since`v3001.0



[TextureOpt](#TextureOpt):

[filter](#undefined-filter)?: TexFilter
=======================================

[wrap](#undefined-wrap)?: TexWrap
=================================




====================================================================================================================================================================================



[ImageSource](#ImageSource): Exclude<TexImageSource, VideoFrame\>
=================================================================



[Canvas](#Canvas):

[width](#undefined-width): number
=================================

[height](#undefined-height): number
===================================

[toImageData](#undefined-toImageData)(): ImageData
==================================================

[toDataURL](#undefined-toDataURL)(): string
===========================================

[clear](#undefined-clear)(): void
=================================

[draw](#undefined-draw)(action: ()\=>void): void
================================================

[free](#undefined-free)(): void
===============================

[fb](#undefined-fb): FrameBuffer
================================




================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[Vertex](#Vertex):
==================

[pos](#Vertex-pos): Vec2
========================

[uv](#Vertex-uv): Vec2
======================

[color](#Vertex-color): Color
=============================

[opacity](#Vertex-opacity): number
==================================



[TexFilter](#TexFilter): nearest | linear
=========================================

Texture scaling filter. "nearest" is mainly for sharp pixelated scaling, "linear" means linear interpolation.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[TexWrap](#TexWrap): repeat | clampToEdge
=========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[RenderProps](#RenderProps):
============================

Common render properties.

[pos](#RenderProps-pos)?: Vec2
==============================

[scale](#RenderProps-scale)?: Vec2
==================================

[angle](#RenderProps-angle)?: number
====================================

[color](#RenderProps-color)?: Color
===================================

[opacity](#RenderProps-opacity)?: number
========================================

[fixed](#RenderProps-fixed)?: boolean
=====================================

[shader](#RenderProps-shader)?: string | ShaderData | Asset | null
==================================================================

[uniform](#RenderProps-uniform)?: Uniform | null
================================================

[outline](#RenderProps-outline)?: Outline
=========================================



[DrawTextureOpt](#DrawTextureOpt): RenderProps &

[tex](#undefined-tex): Texture
==============================

[width](#undefined-width)?: number
==================================

[height](#undefined-height)?: number
====================================

[tiled](#undefined-tiled)?: boolean
===================================

[flipX](#undefined-flipX)?: boolean
===================================

[flipY](#undefined-flipY)?: boolean
===================================

[quad](#undefined-quad)?: Quad
==============================

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================




========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[DrawUVQuadOpt](#DrawUVQuadOpt): RenderProps &

[width](#undefined-width): number
=================================

Width of the UV quad.

[height](#undefined-height): number
===================================

Height of the UV quad.

[flipX](#undefined-flipX)?: boolean
===================================

If flip the texture horizontally.

[flipY](#undefined-flipY)?: boolean
===================================

If flip the texture vertically.

[tex](#undefined-tex)?: Texture
===============================

The texture to sample for this quad.

[quad](#undefined-quad)?: Quad
==============================

The texture sampling area.

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".




=============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[DrawEllipseOpt](#DrawEllipseOpt): RenderProps &

[radiusX](#undefined-radiusX): number
=====================================

The horizontal radius.

[radiusY](#undefined-radiusY): number
=====================================

The vertical radius.

[start](#undefined-start)?: number
==================================

Starting angle.

[fill](#undefined-fill)?: boolean
=================================

If fill the shape with color (set this to false if you only want an outline).

[gradient](#undefined-gradient)?: \[Color, Color\]
==================================================

Use gradient instead of solid color.

`since`v3000.0

[resolution](#undefined-resolution)?: number
============================================

Multiplier for circle vertices resolution (default 1)

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".




=============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the ellipse should look like.



[DrawPolygonOpt](#DrawPolygonOpt): RenderProps &

[pts](#undefined-pts): Vec2\[\]
===============================

The points that make up the polygon

[fill](#undefined-fill)?: boolean
=================================

If fill the shape with color (set this to false if you only want an outline).

[indices](#undefined-indices)?: number\[\]
==========================================

Manual triangulation.

[offset](#undefined-offset)?: Vec2
==================================

The center point of transformation in relation to the position.

[radius](#undefined-radius)?: number | number\[\]
=================================================

The radius of each corner.

[colors](#undefined-colors)?: Color\[\]
=======================================

The color of each vertex.

`since`v3000.0

[uv](#undefined-uv)?: Vec2\[\]
==============================

The uv of each vertex.

`since`v3001.0

[tex](#undefined-tex)?: Texture
===============================

The texture if uv are supplied.

`since`v3001.0

[triangulate](#undefined-triangulate)?: boolean
===============================================

Triangulate concave polygons.

`since`v3001.0




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the polygon should look like.



[Outline](#Outline):
====================

[width](#Outline-width)?: number
================================

The width, or thickness of the line.

[color](#Outline-color)?: Color
===============================

The color of the line.

[opacity](#Outline-opacity)?: number
====================================

Opacity (overrides fill opacity).

`since`v3001.0

[join](#Outline-join)?: LineJoin
================================

Line join.

`since`v3000.0

[miterLimit](#Outline-miterLimit)?: number
==========================================

Miter limit. If the length of the miter divided by the line width exceeds this limit, the style is converted to a bevel.

`since`v3001.0

[cap](#Outline-cap)?: LineCap
=============================

Line cap.

`since`v3001.0



[Mask](#Mask): intersect | subtract
===================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[SpriteCurAnim](#SpriteCurAnim):
================================

[timer](#SpriteCurAnim-timer): number
=====================================

[loop](#SpriteCurAnim-loop): boolean
====================================

[speed](#SpriteCurAnim-speed): number
=====================================

[pingpong](#SpriteCurAnim-pingpong): boolean
============================================

[onEnd](#SpriteCurAnim-onEnd)(): void
=====================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[ButtonState](#ButtonState)<T\>:
================================

[pressed](#ButtonState-pressed): Set<T\>
========================================

[pressedRepeat](#ButtonState-pressedRepeat): Set<T\>
====================================================

[released](#ButtonState-released): Set<T\>
==========================================

[down](#ButtonState-down): Set<T\>
==================================

[update](#ButtonState-update)(): void
=====================================

[press](#ButtonState-press)(btn: T): void
=========================================

[pressRepeat](#ButtonState-pressRepeat)(btn: T): void
=====================================================

[release](#ButtonState-release)(btn: T): void
=============================================



[GamepadState](#GamepadState):
==============================

[buttonState](#GamepadState-buttonState): ButtonState<KGamepadButton\>
======================================================================

[stickState](#GamepadState-stickState): Map<GamepadStick, Vec2\>
================================================================



[FPSCounter](#FPSCounter):
==========================

[dts](#FPSCounter-dts):
=======================

[timer](#FPSCounter-timer):
===========================

[fps](#FPSCounter-fps): number
==============================

[tick](#FPSCounter-tick)(dt: number): void
==========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[App](#App): ReturnType<initApp\>
=================================



[initAppGfx](#initAppGfx)(gopt: KAPLAYOpt, ggl: GfxCtx):

[lastDrawCalls](#undefined-lastDrawCalls): number
=================================================

[ggl](#undefined-ggl):

[gl](#undefined-gl): WebGLRenderingContext
==========================================

[opts](#undefined-opts):

[texFilter](#undefined-texFilter)?: TexFilter
=============================================




=========================================================================================================================

[onDestroy](#undefined-onDestroy)(action: ()\=>unknown): void
=============================================================

[destroy](#undefined-destroy)(): void
=====================================

[pushTexture2D](#undefined-pushTexture2D)(item: WebGLTexture): void
===================================================================

[popTexture2D](#undefined-popTexture2D)(): void
===============================================

[pushArrayBuffer](#undefined-pushArrayBuffer)(item: WebGLBuffer): void
======================================================================

[popArrayBuffer](#undefined-popArrayBuffer)(): void
===================================================

[pushElementArrayBuffer](#undefined-pushElementArrayBuffer)(item: WebGLBuffer): void
====================================================================================

[popElementArrayBuffer](#undefined-popElementArrayBuffer)(): void
=================================================================

[pushFramebuffer](#undefined-pushFramebuffer)(item: WebGLFramebuffer): void
===========================================================================

[popFramebuffer](#undefined-popFramebuffer)(): void
===================================================

[pushRenderbuffer](#undefined-pushRenderbuffer)(item: WebGLRenderbuffer): void
==============================================================================

[popRenderbuffer](#undefined-popRenderbuffer)(): void
=====================================================

[pushViewport](#undefined-pushViewport)(item:

[x](#undefined-x): number
=========================

[y](#undefined-y): number
=========================

[w](#undefined-w): number
=========================

[h](#undefined-h): number
=========================

): void
==========================================================================================================================================================================================================================================================================

[popViewport](#undefined-popViewport)(): void
=============================================

[pushProgram](#undefined-pushProgram)(item: WebGLProgram): void
===============================================================

[popProgram](#undefined-popProgram)(): void
===========================================

[setVertexFormat](#undefined-setVertexFormat)(fmt: VertexFormat): void
======================================================================




=============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

[defShader](#undefined-defShader): Shader
=========================================

[defTex](#undefined-defTex): Texture
====================================

[frameBuffer](#undefined-frameBuffer): FrameBuffer
==================================================

[postShader](#undefined-postShader): string | null
==================================================

[postShaderUniform](#undefined-postShaderUniform): Uniform | ()\=>Uniform | null
================================================================================

[renderer](#undefined-renderer): BatchRenderer
==============================================

[transform](#undefined-transform): Mat23
========================================

[transformStack](#undefined-transformStack): Mat23\[\]
======================================================

[transformStackIndex](#undefined-transformStackIndex): number
=============================================================

[bgTex](#undefined-bgTex): Texture
==================================

[bgColor](#undefined-bgColor): Color | null
===========================================

[bgAlpha](#undefined-bgAlpha): number
=====================================

[width](#undefined-width): number
=================================

[height](#undefined-height): number
===================================

[viewport](#undefined-viewport):

[x](#undefined-x): number
=========================

[y](#undefined-y): number
=========================

[width](#undefined-width): number
=================================

[height](#undefined-height): number
===================================




============================================================================================================================================================================================================================================================================================

[fixed](#undefined-fixed): boolean
==================================




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[initAssets](#initAssets)(ggl: GfxCtx):

[urlPrefix](#undefined-urlPrefix): string
=========================================

[sprites](#undefined-sprites): AssetBucket<SpriteData\>
=======================================================

[fonts](#undefined-fonts): AssetBucket<FontData\>
=================================================

[bitmapFonts](#undefined-bitmapFonts): AssetBucket<GfxFont\>
============================================================

[sounds](#undefined-sounds): AssetBucket<SoundData\>
====================================================

[shaders](#undefined-shaders): AssetBucket<Shader\>
===================================================

[custom](#undefined-custom): AssetBucket<any\>
==============================================

[music](#undefined-music): Record<string, string\>
==================================================

[packer](#undefined-packer): TexPacker
======================================

[loaded](#undefined-loaded): boolean
====================================




=====================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[initAudio](#initAudio)():

[ctx](#undefined-ctx): AudioContext
===================================

[masterNode](#undefined-masterNode): GainNode
=============================================

[burpSnd](#undefined-burpSnd): SoundData
========================================




=======================================================================================================================================================================================================================================================================================



[initGame](#initGame)():

[events](#undefined-events): KEventHandler<

[mouseMove](#undefined-mouseMove): \[\]
=======================================

[mouseDown](#undefined-mouseDown): \[MouseButton\]
==================================================

[mousePress](#undefined-mousePress): \[MouseButton\]
====================================================

[mouseRelease](#undefined-mouseRelease): \[MouseButton\]
========================================================

[charInput](#undefined-charInput): \[string\]
=============================================

[keyPress](#undefined-keyPress): \[Key\]
========================================

[keyDown](#undefined-keyDown): \[Key\]
======================================

[keyPressRepeat](#undefined-keyPressRepeat): \[Key\]
====================================================

[keyRelease](#undefined-keyRelease): \[Key\]
============================================

[touchStart](#undefined-touchStart): \[Vec2, Touch\]
====================================================

[touchMove](#undefined-touchMove): \[Vec2, Touch\]
==================================================

[touchEnd](#undefined-touchEnd): \[Vec2, Touch\]
================================================

[gamepadButtonDown](#undefined-gamepadButtonDown): \[string\]
=============================================================

[gamepadButtonPress](#undefined-gamepadButtonPress): \[string\]
===============================================================

[gamepadButtonRelease](#undefined-gamepadButtonRelease): \[string\]
===================================================================

[gamepadStick](#undefined-gamepadStick): \[string, Vec2\]
=========================================================

[gamepadConnect](#undefined-gamepadConnect): \[Gamepad\]
========================================================

[gamepadDisconnect](#undefined-gamepadDisconnect): \[Gamepad\]
==============================================================

[scroll](#undefined-scroll): \[Vec2\]
=====================================

[add](#undefined-add): \[GameObj\]
==================================

[destroy](#undefined-destroy): \[GameObj\]
==========================================

[use](#undefined-use): \[GameObj, string\]
==========================================

[unuse](#undefined-unuse): \[GameObj, string\]
==============================================

[tag](#undefined-tag): \[GameObj, string\]
==========================================

[untag](#undefined-untag): \[GameObj, string\]
==============================================

[load](#undefined-load): \[\]
=============================

[loadError](#undefined-loadError): \[string, Asset\]
====================================================

[loading](#undefined-loading): \[number\]
=========================================

[error](#undefined-error): \[Error\]
====================================

[input](#undefined-input): \[\]
===============================

[frameEnd](#undefined-frameEnd): \[\]
=====================================

[resize](#undefined-resize): \[\]
=================================

[sceneLeave](#undefined-sceneLeave): \[string\]
===============================================

[sceneEnter](#undefined-sceneEnter): \[string\]
===============================================

\>
=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

[objEvents](#undefined-objEvents): KEventHandler<GameObjEvents\>
================================================================

[root](#undefined-root): GameObj<TimerComp\>
============================================

[gravity](#undefined-gravity): Vec2 | null
==========================================

[scenes](#undefined-scenes): Record<SceneName, SceneDef\>
=========================================================

[currentScene](#undefined-currentScene): SceneName | null
=========================================================

[layers](#undefined-layers): string\[\] | null
==============================================

[defaultLayerIndex](#undefined-defaultLayerIndex): number
=========================================================

[logs](#undefined-logs):

[msg](#undefined-msg): string |
===============================

[time](#undefined-time): number
===============================

\[\]
================================================================================================================================================================

[cam](#undefined-cam):

[pos](#undefined-pos): Vec2 | null
==================================

[scale](#undefined-scale): Vec2
===============================

[angle](#undefined-angle): number
=================================

[shake](#undefined-shake): number
=================================

[transform](#undefined-transform): Mat23
========================================




===============================================================================================================================================================================================================================================================================================================================================================================================




========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[initApp](#initApp)(opt:

[canvas](#undefined-canvas): HTMLCanvasElement
==============================================

[touchToMouse](#undefined-touchToMouse)?: boolean
=================================================

[gamepads](#undefined-gamepads)?: Record<string, GamepadDef\>
=============================================================

[pixelDensity](#undefined-pixelDensity)?: number
================================================

[maxFPS](#undefined-maxFPS)?: number
====================================

[buttons](#undefined-buttons)?: ButtonsDef
==========================================

):

[state](#undefined-state):

[canvas](#undefined-canvas): HTMLCanvasElement
==============================================

[buttons](#undefined-buttons): ButtonsDef
=========================================

[buttonsByKey](#undefined-buttonsByKey): Map<Key, string\[\]\>
==============================================================

[buttonsByMouse](#undefined-buttonsByMouse): Map<MouseButton, string\[\]\>
==========================================================================

[buttonsByGamepad](#undefined-buttonsByGamepad): Map<KGamepadButton, string\[\]\>
=================================================================================

[buttonsByKeyCode](#undefined-buttonsByKeyCode): Map<string, string\[\]\>
=========================================================================

[loopID](#undefined-loopID): null | number
==========================================

[stopped](#undefined-stopped): boolean
======================================

[dt](#undefined-dt): number
===========================

[fixedDt](#undefined-fixedDt): number
=====================================

[restDt](#undefined-restDt): number
===================================

[time](#undefined-time): number
===============================

[realTime](#undefined-realTime): number
=======================================

[fpsCounter](#undefined-fpsCounter): FPSCounter
===============================================

[timeScale](#undefined-timeScale): number
=========================================

[skipTime](#undefined-skipTime): boolean
========================================

[isHidden](#undefined-isHidden): boolean
========================================

[numFrames](#undefined-numFrames): number
=========================================

[mousePos](#undefined-mousePos): Vec2
=====================================

[mouseDeltaPos](#undefined-mouseDeltaPos): Vec2
===============================================

[keyState](#undefined-keyState): ButtonState<Key\>
==================================================

[mouseState](#undefined-mouseState): ButtonState<MouseButton\>
==============================================================

[mergedGamepadState](#undefined-mergedGamepadState): GamepadState
=================================================================

[gamepadStates](#undefined-gamepadStates): Map<number, GamepadState\>
=====================================================================

[lastInputDevice](#undefined-lastInputDevice): mouse | keyboard | gamepad | null
================================================================================

[buttonState](#undefined-buttonState): ButtonState<string\>
===========================================================

[gamepads](#undefined-gamepads): KGamepad\[\]
=============================================

[charInputted](#undefined-charInputted): string\[\]
===================================================

[isMouseMoved](#undefined-isMouseMoved): boolean
================================================

[lastWidth](#undefined-lastWidth): number
=========================================

[lastHeight](#undefined-lastHeight): number
===========================================

[events](#undefined-events): KEventHandler<AppEventMap\>
========================================================




======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

[dt](#undefined-dt)(): number
=============================

[fixedDt](#undefined-fixedDt)(): number
=======================================

[restDt](#undefined-restDt)(): number
=====================================

[time](#undefined-time)(): number
=================================

[run](#undefined-run)(fixedUpdate: ()\=>void, update: (processInput: ()\=>void, resetInput: ()\=>void)\=>void): void
====================================================================================================================

[canvas](#undefined-canvas): HTMLCanvasElement
==============================================

[fps](#undefined-fps)(): number
===============================

[numFrames](#undefined-numFrames)(): number
===========================================

[quit](#undefined-quit)(): void
===============================

[isHidden](#undefined-isHidden)(): boolean
==========================================

[setFullscreen](#undefined-setFullscreen)(f?: boolean): void
============================================================

[isFullscreen](#undefined-isFullscreen)(): boolean
==================================================

[setCursor](#undefined-setCursor)(c: Cursor): void
==================================================

[screenshot](#undefined-screenshot)(): string
=============================================

[getGamepads](#undefined-getGamepads)(): KGamepad\[\]
=====================================================

[getCursor](#undefined-getCursor)(): Cursor
===========================================

[setCursorLocked](#undefined-setCursorLocked)(b: boolean): void
===============================================================

[isCursorLocked](#undefined-isCursorLocked)(): boolean
======================================================

[isTouchscreen](#undefined-isTouchscreen)(): boolean
====================================================

[mousePos](#undefined-mousePos)(): Vec2
=======================================

[mouseDeltaPos](#undefined-mouseDeltaPos)(): Vec2
=================================================

[isKeyDown](#undefined-isKeyDown)(k?: Key | Key\[\]): boolean
=============================================================

[isKeyPressed](#undefined-isKeyPressed)(k?: Key | Key\[\]): boolean
===================================================================

[isKeyPressedRepeat](#undefined-isKeyPressedRepeat)(k?: Key | Key\[\]): boolean
===============================================================================

[isKeyReleased](#undefined-isKeyReleased)(k?: Key | Key\[\]): boolean
=====================================================================

[isMouseDown](#undefined-isMouseDown)(m?: MouseButton): boolean
===============================================================

[isMousePressed](#undefined-isMousePressed)(m?: MouseButton): boolean
=====================================================================

[isMouseReleased](#undefined-isMouseReleased)(m?: MouseButton): boolean
=======================================================================

[isMouseMoved](#undefined-isMouseMoved)(): boolean
==================================================

[isGamepadButtonPressed](#undefined-isGamepadButtonPressed)(btn?: KGamepadButton | KGamepadButton\[\]): boolean
===============================================================================================================

[isGamepadButtonDown](#undefined-isGamepadButtonDown)(btn?: KGamepadButton | KGamepadButton\[\]): boolean
=========================================================================================================

[isGamepadButtonReleased](#undefined-isGamepadButtonReleased)(btn?: KGamepadButton | KGamepadButton\[\]): boolean
=================================================================================================================

[getGamepadStick](#undefined-getGamepadStick)(stick: GamepadStick): Vec2
========================================================================

[isButtonPressed](#undefined-isButtonPressed)(btn?: string | string\[\]): boolean
=================================================================================

[isButtonDown](#undefined-isButtonDown)(btn?: string | string\[\]): boolean
===========================================================================

[isButtonReleased](#undefined-isButtonReleased)(btn?: string | string\[\]): boolean
===================================================================================

[setButton](#undefined-setButton)(btn: string, binding: ButtonBinding): void
============================================================================

[getButton](#undefined-getButton)(btn: string): ButtonBinding
=============================================================

[pressButton](#undefined-pressButton)(btn: string): void
========================================================

[releaseButton](#undefined-releaseButton)(btn: string): void
============================================================

[charInputted](#undefined-charInputted)(): string\[\]
=====================================================

[onResize](#undefined-onResize)(action: ()\=>void): KEventController
====================================================================

[onKeyDown](#undefined-onKeyDown): (action: (key: Key)\=>void)\=>KEventController & (key: Key | Key\[\], action: (key: Key)\=>void)\=>KEventController
======================================================================================================================================================

[onKeyPress](#undefined-onKeyPress): (action: (key: Key)\=>void)\=>KEventController & (key: Key | Key\[\], action: (key: Key)\=>void)\=>KEventController
========================================================================================================================================================

[onKeyPressRepeat](#undefined-onKeyPressRepeat): (action: (key: Key)\=>void)\=>KEventController & (key: Key | Key\[\], action: (key: Key)\=>void)\=>KEventController
====================================================================================================================================================================

[onKeyRelease](#undefined-onKeyRelease): (action: (key: Key)\=>void)\=>KEventController & (key: Key | Key\[\], action: (key: Key)\=>void)\=>KEventController
============================================================================================================================================================

[onMouseDown](#undefined-onMouseDown): (action: (m: MouseButton)\=>void)\=>KEventController & (mouse: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void)\=>KEventController
========================================================================================================================================================================================

[onMousePress](#undefined-onMousePress): (action: (m: MouseButton)\=>void)\=>KEventController & (mouse: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void)\=>KEventController
==========================================================================================================================================================================================

[onMouseRelease](#undefined-onMouseRelease): (action: (m: MouseButton)\=>void)\=>KEventController & (mouse: MouseButton | MouseButton\[\], action: (m: MouseButton)\=>void)\=>KEventController
==============================================================================================================================================================================================

[onMouseMove](#undefined-onMouseMove)(f: (pos: Vec2, dpos: Vec2)\=>void): KEventController
==========================================================================================

[onCharInput](#undefined-onCharInput)(action: (ch: string)\=>void): KEventController
====================================================================================

[onTouchStart](#undefined-onTouchStart)(f: (pos: Vec2, t: Touch)\=>void): KEventController
==========================================================================================

[onTouchMove](#undefined-onTouchMove)(f: (pos: Vec2, t: Touch)\=>void): KEventController
========================================================================================

[onTouchEnd](#undefined-onTouchEnd)(f: (pos: Vec2, t: Touch)\=>void): KEventController
======================================================================================

[onScroll](#undefined-onScroll)(action: (delta: Vec2)\=>void): KEventController
===============================================================================

[onHide](#undefined-onHide)(action: ()\=>void): KEventController
================================================================

[onShow](#undefined-onShow)(action: ()\=>void): KEventController
================================================================

[onGamepadButtonDown](#undefined-onGamepadButtonDown): (action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController & (btn: KGamepadButton, action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController
=======================================================================================================================================================================================================================================

[onGamepadButtonPress](#undefined-onGamepadButtonPress): (action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController & (btn: KGamepadButton | KGamepadButton\[\], action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController
==============================================================================================================================================================================================================================================================

[onGamepadButtonRelease](#undefined-onGamepadButtonRelease): (action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController & (btn: KGamepadButton | KGamepadButton\[\], action: (btn: KGamepadButton, gamepad: KGamepad)\=>void)\=>KEventController
==================================================================================================================================================================================================================================================================

[onGamepadStick](#undefined-onGamepadStick)(stick: GamepadStick, action: (value: Vec2, gp: KGamepad)\=>void): KEventController
==============================================================================================================================

[onGamepadConnect](#undefined-onGamepadConnect)(action: (gamepad: KGamepad)\=>void): KEventController
=====================================================================================================

[onGamepadDisconnect](#undefined-onGamepadDisconnect)(action: (gamepad: KGamepad)\=>void): KEventController
===========================================================================================================

[onButtonPress](#undefined-onButtonPress): (action: (btn: string)\=>void)\=>KEventController & (btn: string | string, action: (btn: string)\=>void)\=>KEventController
======================================================================================================================================================================

[onButtonDown](#undefined-onButtonDown): (action: (btn: string)\=>void)\=>KEventController & (btn: string | string, action: (btn: string)\=>void)\=>KEventController
====================================================================================================================================================================

[onButtonRelease](#undefined-onButtonRelease): (action: (btn: string)\=>void)\=>KEventController & (btn: string | string, action: (btn: string)\=>void)\=>KEventController
==========================================================================================================================================================================

[getLastInputDeviceType](#undefined-getLastInputDeviceType)(): ButtonBindingDevice | null
=========================================================================================

[events](#undefined-events): KEventHandler<AppEventMap\>
========================================================




===================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================



[DrawTextOpt](#DrawTextOpt): RenderProps &

[text](#undefined-text): string
===============================

The text to render.

[font](#undefined-font)?: string | FontData | Asset | BitmapFontData | Asset
============================================================================

The name of font to use.

[size](#undefined-size)?: number
================================

The size of text (the height of each character).

[align](#undefined-align)?: TextAlign
=====================================

Text alignment (default "left")

`since`v3000.0

[width](#undefined-width)?: number
==================================

The maximum width. Will wrap word around if exceed.

[lineSpacing](#undefined-lineSpacing)?: number
==============================================

The gap between each line (only available for bitmap fonts).

`since`v2000.2

[letterSpacing](#undefined-letterSpacing)?: number
==================================================

The gap between each character (only available for bitmap fonts).

`since`v2000.2

[anchor](#undefined-anchor)?: Anchor | Vec2
===========================================

The anchor point, or the pivot point. Default to "topleft".

[transform](#undefined-transform)?: CharTransform | CharTransformFunc
=====================================================================

Transform the pos, scale, rotation or color for each character based on the index or char (only available for bitmap fonts).

`since`v2000.1

[styles](#undefined-styles)?: Record<string, CharTransform | CharTransformFunc\>
================================================================================

Stylesheet for styled chunks, in the syntax of "this is a \[stylename\]styled\[/stylename\] word" (only available for bitmap fonts).

`since`v2000.2

[indentAll](#undefined-indentAll)?: boolean
===========================================

If true, any (whitespace) indent on the first line of the paragraph will be copied to all of the lines for those parts that text-wrap.




==========================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

How the text should look like.



[TextAlign](#TextAlign): center | left | right
==============================================

How the text should be aligned.

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[drawSprite](#drawSprite)(opt: DrawSpriteOpt): void
===================================================

Draw a sprite.

`param`opt\- The draw sprite options.

    drawSprite({
        sprite: "bean",
        pos: vec2(100, 200),
        frame: 3,
    });


`since`v2000.0



[drawText](#drawText)(opt: DrawTextOpt): void
=============================================

Draw a piece of text.

`param`opt\- The draw text options.

    drawText({
        text: "oh hi",
        size: 48,
        font: "sans-serif",
        width: 120,
        pos: vec2(100, 200),
        color: rgb(0, 0, 255),
    });


`since`v2000.0



[drawRect](#drawRect)(opt: DrawRectOpt): void
=============================================

Draw a rectangle.

`param`opt\- The draw rect options.

    drawRect({
        width: 120,
        height: 240,
        pos: vec2(20, 20),
        color: YELLOW,
        outline: { color: BLACK, width: 4 },
    });


`since`v2000.0



[drawLine](#drawLine)(opt: DrawLineOpt): void
=============================================

Draw a line.

`param`opt\- The draw line options.

    drawLine({
        p1: vec2(0),
        p2: mousePos(),
        width: 4,
        color: rgb(0, 0, 255),
    });


`since`v3000.0



[drawLines](#drawLines)(opt: DrawLinesOpt): void
================================================

Draw lines.

`param`opt\- The draw lines options.

    drawLines({
        pts: [ vec2(0), vec2(0, height()), mousePos() ],
        width: 4,
        pos: vec2(100, 200),
        color: rgb(0, 0, 255),
    });


`since`v3000.0



[drawCurve](#drawCurve)(curve: (t: number)\=>Vec2, opt: DrawCurveOpt): void
===========================================================================

Draw a curve.

    drawCurve(t => evaluateBezier(a, b, c, d, t)
    {
        width: 2,
        color: rgb(0, 0, 255),
    });


`since`v3001.0



[drawBezier](#drawBezier)(opt: DrawBezierOpt): void
===================================================

Draw a cubic Bezier curve.

`param`opt\- The draw cubic bezier options.

    drawBezier({
        pt1: vec2(100, 100),
        pt2: vec2(200, 100),
        pt3: vec2(200, 200),
        pt4: vec2(100, 200),
        width: 2,
        color: GREEN
    });


`since`v3001.0



[drawTriangle](#drawTriangle)(opt: DrawTriangleOpt): void
=========================================================

Draw a triangle.

`param`opt\- The draw triangle options.

    drawTriangle({
        p1: vec2(0),
        p2: vec2(0, height()),
        p3: mousePos(),
        pos: vec2(100, 200),
        color: rgb(0, 0, 255),
    });


`since`v3001.0



[drawCircle](#drawCircle)(opt: DrawCircleOpt): void
===================================================

Draw a circle.

`param`opt\- The draw circle options.

    drawCircle({
        pos: vec2(100, 200),
        radius: 120,
        color: rgb(255, 255, 0),
    });


`since`v2000.0



[drawEllipse](#drawEllipse)(opt: DrawEllipseOpt): void
======================================================

Draw an ellipse.

`param`opt\- The draw ellipse options.

    drawEllipse({
        pos: vec2(100, 200),
        radiusX: 120,
        radiusY: 120,
        color: rgb(255, 255, 0),
    });


`since`v3000.0



[drawPolygon](#drawPolygon)(opt: DrawPolygonOpt): void
======================================================

Draw a convex polygon from a list of vertices.

`param`opt\- The draw polygon options.

    drawPolygon({
        pts: [
            vec2(-12),
            vec2(0, 16),
            vec2(12, 4),
            vec2(0, -2),
            vec2(-8),
        ],
        pos: vec2(100, 200),
        color: rgb(0, 0, 255),
    });


`since`v3000.0



[drawUVQuad](#drawUVQuad)(opt: DrawUVQuadOpt): void
===================================================

Draw a rectangle with UV data.

`param`opt\- The draw rect with UV options.

`since`v2000.0



[drawFormattedText](#drawFormattedText)(text: FormattedText): void
==================================================================

Draw a piece of formatted text from formatText().

`param`text\- The formatted text object.

    // text background
    const txt = formatText({
        text: "oh hi",
    });

    drawRect({
        width: txt.width,
        height: txt.height,
    });

    drawFormattedText(txt);


`since`v2000.2



[drawMasked](#drawMasked)(content: ()\=>void, mask: ()\=>void): void
====================================================================

Whatever drawn in content will only be drawn if it's also drawn in mask (mask will not be rendered).

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[drawSubtracted](#drawSubtracted)(content: ()\=>void, mask: ()\=>void): void
============================================================================

Subtract whatever drawn in content by whatever drawn in mask (mask will not be rendered).

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[pushTransform](#pushTransform)(): void
=======================================

Push current transform matrix to the transform stack.

    pushTransform();

    // These transforms will affect every render until popTransform()
    pushTranslate(120, 200);
    pushRotate(time() * 120);
    pushScale(6);

    drawSprite("bean");
    drawCircle(vec2(0), 120);

    // Restore the transformation stack to when last pushed
    popTransform();


`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[popTransform](#popTransform)(): void
=====================================

Pop the topmost transform matrix from the transform stack.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[pushTranslate](#pushTranslate)(t?: Vec2): void
===============================================

Translate all subsequent draws.

    pushTranslate(100, 100)

    // this will be drawn at (120, 120)
    drawText({
        text: "oh hi",
        pos: vec2(20, 20),
    })


`since`v2000.0



[pushScale](#pushScale)(s?: Vec2): void
=======================================

Scale all subsequent draws.

`since`v2000.0



[pushRotate](#pushRotate)(angle?: number): void
===============================================

Rotate all subsequent draws.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[pushMatrix](#pushMatrix)(mat?: Mat23): void
============================================

Apply a transform matrix, ignore all prior transforms.

`since`v3000.0



[usePostEffect](#usePostEffect)(name: string, uniform?: Uniform | ()\=>Uniform): void
=====================================================================================

Apply a post process effect from a shader name.

    loadShader("invert", null, `
    vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
        vec4 c = def_frag();
        return vec4(1.0 - c.r, 1.0 - c.g, 1.0 - c.b, c.a);
    }
    `)

    usePostEffect("invert")


`since`v3000.0



[formatText](#formatText)(options: DrawTextOpt): FormattedText
==============================================================

Format a piece of text without drawing (for getting dimensions, etc).

    // text background
    const txt = formatText({
        text: "oh hi",
    });

    drawRect({
        width: txt.width,
        height: txt.height,
    });

    drawFormattedText(txt);


`returns`The formatted text object.

`since`v2000.2



[makeCanvas](#makeCanvas)(w: number, h: number): Canvas
=======================================================

Create a canvas to draw stuff offscreen.

`returns`The canvas object.

`since`v3001.0



[Cursor](#Cursor): string | auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | all-scroll | col-resize | row-resize | n-resize | e-resize | s-resize | w-resize | ne-resize | nw-resize | se-resize | sw-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | zoom-int | zoom-out
==========================================================================================================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Anchor](#Anchor): topleft | top | topright | left | center | right | botleft | bot | botright
==============================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[Shape](#Shape): Rect | Line | Point | Circle | Ellipse | Polygon
=================================================================



[CharTransform](#CharTransform):
================================

Describes how to transform each character.

[pos](#CharTransform-pos)?: Vec2
================================

Offset to apply to the position of the text character. Shifts the character's position by the specified 2D vector.

[scale](#CharTransform-scale)?: Vec2 | number
=============================================

Scale transformation to apply to the text character's current scale. When a number, it is scaled uniformly. Given a 2D vector, it is scaled independently along the X and Y axis.

[angle](#CharTransform-angle)?: number
======================================

Increases the amount of degrees to rotate the text character.

[color](#CharTransform-color)?: Color
=====================================

Color transformation applied to the text character. Multiplies the current color with this color.

[opacity](#CharTransform-opacity)?: number
==========================================

Opacity multiplication applied to the text character. For example, an opacity of 0.4 with 2 set in the transformation, the resulting opacity will be 0.8 (0.4 × 2).

[override](#CharTransform-override)?: boolean
=============================================

If true, the styles applied by this specific entry transform will override, rather than compose with, the default styles given in and by other components' styles.



[BoomOpt](#BoomOpt):
====================

[speed](#BoomOpt-speed)?: number
================================

Animation speed.

[scale](#BoomOpt-scale)?: number
================================

Scale.

[comps](#BoomOpt-comps)?: CompList<any\>
========================================

Additional components.

`since`v3000.0



[LevelOpt](#LevelOpt):
======================

[tileWidth](#LevelOpt-tileWidth): number
========================================

Width of each block.

[tileHeight](#LevelOpt-tileHeight): number
==========================================

Height of each block.

[pos](#LevelOpt-pos)?: Vec2
===========================

Position of the first block.

[tiles](#LevelOpt-tiles):
=========================

Definition of each tile.

[wildcardTile](#LevelOpt-wildcardTile)?(sym: string, pos: Vec2): CompList | null | undefined
============================================================================================

Called when encountered a symbol not defined in "tiles".



[GetOpt](#GetOpt):

[recursive](#undefined-recursive)?: boolean
===========================================

Recursively get all children and their descendants.

[liveUpdate](#undefined-liveUpdate)?: boolean
=============================================

Live update the returned list every time object is added / removed.

[only](#undefined-only)?: tags | comps
======================================

Get only by tags or components.




======================================================================================================================================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[QueryOpt](#QueryOpt):

[include](#undefined-include)?: string | string\[\]
===================================================

All objects which include all or any of these tags, depending on includeOp.

[includeOp](#undefined-includeOp)?: and | or
============================================

Selects the operator to use. Defaults to and.

[exclude](#undefined-exclude)?: string | string\[\]
===================================================

All objects which do not have all or any of these tags, depending on excludeOp.

[excludeOp](#undefined-excludeOp)?: and | or
============================================

Selects the operator to use. Defaults to and.

[distance](#undefined-distance)?: number
========================================

All objects which are near or far to the position of this, depending on distanceOp.

[distanceOp](#undefined-distanceOp)?: near | far
================================================

Selects the operator to use. Defaults to near.

[visible](#undefined-visible)?: boolean
=======================================

All objects visible from this standpoint.

[hierarchy](#undefined-hierarchy)?: children | siblings | ancestors | descendants
=================================================================================

All objects in the given group. Defaults to children.




=================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[PathFindOpt](#PathFindOpt):

[allowDiagonals](#undefined-allowDiagonals)?: boolean
=====================================================




=============================================================================================================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[FrameBuffer](#FrameBuffer):
============================

[ctx](#FrameBuffer-ctx): GfxCtx
===============================

[tex](#FrameBuffer-tex): Texture
================================

[glFramebuffer](#FrameBuffer-glFramebuffer): WebGLFramebuffer
=============================================================

[glRenderbuffer](#FrameBuffer-glRenderbuffer): WebGLRenderbuffer
================================================================

[width](#FrameBuffer-width)(): number
=====================================

[height](#FrameBuffer-height)(): number
=======================================

[toImageData](#FrameBuffer-toImageData)(): ImageData
====================================================

[toDataURL](#FrameBuffer-toDataURL)(): string
=============================================

[clear](#FrameBuffer-clear)(): void
===================================

[draw](#FrameBuffer-draw)(action: ()\=>void): void
==================================================

[bind](#FrameBuffer-bind)(): void
=================================

[unbind](#FrameBuffer-unbind)(): void
=====================================

[free](#FrameBuffer-free)(): void
=================================



[Shader](#Shader):
==================

[ctx](#Shader-ctx): GfxCtx
==========================

[glProgram](#Shader-glProgram): WebGLProgram
============================================

[bind](#Shader-bind)(): void
============================

[unbind](#Shader-unbind)(): void
================================

[send](#Shader-send)(uniform: Uniform): void
============================================

[free](#Shader-free)(): void
============================



[layer](#layer)(name: string): LayerComp
========================================

Determines the layer for objects. Object will be drawn on top if the layer index is higher.

`param`name\- The layer name to set.

    // Define layers
    layers(["background", "game", "foreground"], "game")

    const bean = add([
        sprite("bean"),
        pos(100, 100),
        layer("background"),
    ])

    // Mark is in a higher layer, so he will be drawn on top of bean
    const mark = add([
        sprite("mark"),
        pos(100, 100),
        layer("game"),
    ])

    bean.layer("foreground") // Bean is now in the foreground layer and will be drawn on top of mark

`returns`The layer comp.

`since`v3001.0



[onCollideEnd](#onCollideEnd)(t1: Tag, t2: Tag, action: (a: GameObj, b: GameObj, col?: Collision)\=>void): KEventController
===========================================================================================================================

Register an event that runs once frame when 2 game objs with certain tags stops colliding (required to have area() component).

`param`t1\- The tag of the first game obj.

`param`t2\- The tag of the second game obj.

`param`action\- The function to run when the event is triggered.

    onCollideEnd("bean", "earth", () => {
        debug.log("destroying world in 3... 2... 1...")
    });


`returns`The event controller.

`since`v3000.0



[setGravity](#setGravity)(g: number): void
==========================================

Set gravity.

`param`g\- The gravity to set.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getGravity](#getGravity)(): number
===================================

Get gravity.

`since`v3001.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setGravityDirection](#setGravityDirection)(d: Vec2): void
==========================================================

Set gravity direction.

`since`v3001.0



[getGravityDirection](#getGravityDirection)(): Vec2
===================================================

Get gravity direction.

`returns`The gravity direction.

`since`v3001.0



[setCamPos](#setCamPos)(pos: Vec2): void
========================================

Set camera position.

`param`pos\- The position to set the camera to.

    // move camera to (100, 100)
    setCamPos(100, 100);
    setCamPos(vec2(100, 100));
    setCamPos(100); // x and y are the same


`since`v3001.1



[setCamPos](#setCamPos)(x: number, y: number): void
===================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setCamPos](#setCamPos)(xy: number): void
=========================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getCamPos](#getCamPos)(): Vec2
===============================

Get camera position.

`returns`The current camera position.

`since`v3001.1



[setCamScale](#setCamScale)(scale: Vec2): void
==============================================

Set camera scale.

`param`scale\- The scale to set the camera to.

    // set camera scale to (2, 2)
    setCamScale(2, 2);
    setCamScale(vec2(2, 2));
    setCamScale(2); // x and y are the same


`since`v3001.1



[setCamScale](#setCamScale)(x: number, y: number): void
=======================================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[setCamScale](#setCamScale)(xy: number): void
=============================================

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getCamScale](#getCamScale)(): Vec2
===================================

Get camera scale.

`returns`The current camera scale.

`since`v3001.1



[setCamRot](#setCamRot)(angle: number): void
============================================

Set camera rotation.

`param`angle\- The angle to rotate the camera.

    // rotate camera 90 degrees
    setCamRot(90);


`since`v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getCamRot](#getCamRot)(): number
=================================

Get camera rotation.

`returns`The current camera rotation.

`since`v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getCamTransform](#getCamTransform)(): Mat23
============================================

Get camera transform.

`returns`The current camera transform.

`since`v3001.1



[shake](#shake)(intensity?: number): void
=========================================

Camera shake.

`param`intensity\- The intensity of the shake. Default to 12.

    // shake intensively when bean collides with a "bomb"
    bean.onCollide("bomb", () => {
        shake(120)
    })


`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[flash](#flash)(flashColor: Color, fadeOutTime: number): TimerController
========================================================================

Camera flash.

`param`flashColor\- The color of the flash.

`param`fadeOutTime\- The time it takes for the flash to fade out.

    onClick(() => {
        // flashed
        flash(WHITE, 0.5);
    });


`returns`A timer controller.

`since`v3001.0



[camPos](#camPos)(pos: Vec2): Vec2
==================================

`param`pos\- The position to set the camera to.

`deprecated`Use

    // camera follows player
    player.onUpdate(() => {
        camPos(player.pos)
    })


`returns`The current camera position.

`since`v2000.0



[camPos](#camPos)(x: number, y: number): Vec2
=============================================

`deprecated`



[camPos](#camPos)(xy: number): Vec2
===================================

`deprecated`



[camPos](#camPos)(): Vec2
=========================

`deprecated`



[camScale](#camScale)(scale: Vec2): Vec2
========================================

`param`scale\- The scale to set the camera to.

`deprecated`Use

`returns`The current camera scale.

`since`v2000.0



[camScale](#camScale)(x: number, y: number): Vec2
=================================================

`deprecated`



[camScale](#camScale)(xy: number): Vec2
=======================================

`deprecated`



[camScale](#camScale)(): Vec2
=============================

`deprecated`



[camRot](#camRot)(angle?: number): number
=========================================

`param`angle\- The angle to rotate the camera.

`deprecated`Use

`returns`The current camera rotation.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[camFlash](#camFlash)(flashColor: Color, fadeOutTime: number): TimerController
==============================================================================

`param`flashColor\- The color of the flash.

`param`fadeOutTime\- The time it takes for the flash to fade out.

`deprecated`use

    onClick(() => {
        // flashed
        camFlash(WHITE, 0.5)
    })


`returns`A timer controller.

`since`v3001.0



[camTransform](#camTransform)(): Mat23
======================================

`deprecated`use



[toScreen](#toScreen)(p: Vec2): Vec2
====================================

Transform a point from world position (relative to the root) to screen position (relative to the screen).

`param`p\- The point to transform.

`since`v3001.0



[toWorld](#toWorld)(p: Vec2): Vec2
==================================

Transform a point from screen position (relative to the screen) to world position (relative to the root).

`param`p\- The point to transform.

`since`v3001.0



[play](#play)(src: string | SoundData | Asset | MusicData | Asset, options?: AudioPlayOpt): AudioPlay
=====================================================================================================

Play a piece of audio.

    // play a one off sound
    play("wooosh")

    // play a looping soundtrack (check out AudioPlayOpt for more options)
    const music = play("OverworldlyFoe", {
        volume: 0.8,
        loop: true
    })

    // using the handle to control (check out AudioPlay for more controls / info)
    music.paused = true
    music.speed = 1.2


`returns`A control handle.

`since`v2000.0



[burp](#burp)(options?: AudioPlayOpt): AudioPlay
================================================

Yep. Plays a burp sound.

`returns`A control handle.

`since`v2000.0



[setVolume](#setVolume)(v: number): void
========================================

Set the global volume.

`param`v\- The volume to set.

    setVolume(0.5)


`since`v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getVolume](#getVolume)(): number
=================================

Get the global volume.

`returns`The current volume.

`since`v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[volume](#volume)(v?: number): number
=====================================

`deprecated`Use

    // makes everything quieter
    volume(0.5)


`returns`The new volume or the current volume.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[audioCtx](#audioCtx): AudioContext
===================================

Get the underlying browser AudioContext.

`since`v2000.0



[rand](#rand)<T\>(a?: T, b?: T): T
==================================

Get a random value between the given bound.

`param`a\- The lower bound. If not upper bound, this is the upper bound and the lower bound is 0.

`param`b\- The upper bound.

    // a random number between 0 - 8
    rand(8)

    // a random point on screen
    rand(vec2(width(), height()))

    // a random color
    rand(rgb(255, 255, 255))

    // a random number between 50 - 100
    rand(50, 100);

    // a random point on screen with x between 20 - 100 and y between 20 - 100
    rand(vec2(20), vec2(100));

    // spawn something on the right side of the screen but with random y value within screen height
    add([
        pos(width(), rand(0, height())),
    ]);


`since`v2000.0



[randi](#randi)(a?: number, b?: number): number
===============================================

rand() but floored to integer. If not arguments, returns 0 or 1.

`param`a\- The lower bound. If not upper bound, this is the upper bound.

`param`b\- The upper bound.

    randi(); // returns either 0 or 1
    randi(10); // returns a random integer between 0 and 9
    randi(10, 20); // returns a random integer between 10 and 19


`returns`A random integer between 0 and 1.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[randSeed](#randSeed)(seed?: number): number
============================================

Get / set the random number generator seed.

`param`seed\- The seed to set.

    randSeed(Date.now())


`returns`The new seed.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[choose](#choose)<T\>(lst: T\[\]): T
====================================

Choose a random item from a list.

`param`lst\- The list to choose from.

    // decide the best fruit randomly
    const bestFruit = choose(["apple", "banana", "pear", "watermelon"]);


`returns`A random item from the list.

`since`v3001.0



[chooseMultiple](#chooseMultiple)<T\>(lst: T\[\], count: number): T\[\]
=======================================================================

Choose multiple random items from a list.

`param`lst\- The list to choose from.

`param`count\- The number of items to choose.

`returns`An array of random items from the list.

`since`v3001.0



[shuffle](#shuffle)<T\>(lst: T\[\]): T\[\]
==========================================

Shuffle an array.

`param`lst\- The list to shuffle.

`returns`A shuffled array.

`since`v3001.0



[setLayers](#setLayers)(layers: string\[\], defaultLayer: string): void
=======================================================================

Define the layer names. Should be called before any objects are made.

`param`layers\- The layer names.

`param`defaultLayer\- The default layer name.

    layers(["bg", "obj", "ui"], "obj")

    // no layer specified, will be added to "obj"
    add([
         sprite("bean"),
    ]);

    // add to "bg" layer
    add([
        sprite("bg"),
        layer("bg"),
    ]);


`since`v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getLayers](#getLayers)(): string\[\] | null
============================================

Get the layer names.

`returns`The layer names or null if not set.

`since`v3001.1

`experimental`This feature is in experimental phase, it will be fully released in v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[getDefaultLayer](#getDefaultLayer)(): string | null
====================================================

Get the default layer name.

`returns`The default layer name or null if not set.

`since`v3001.0.5

`experimental`This feature is in experimental phase, it will be fully released in v3001.1

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[addLevel](#addLevel)(map: string\[\], opt: LevelOpt): GameObj
==============================================================

Construct a level based on symbols.

`param`map\- The map data.

`param`opt\- The level options.

    addLevel([
        "                          $",
        "                          $",
        "           $$         =   $",
        "  %      ====         =   $",
        "                      =    ",
        "       ^^      = >    =   &",
        "===========================",
    ], {
        // define the size of tile block
        tileWidth: 32,
        tileHeight: 32,
        // define what each symbol means, by a function returning a component list (what will be passed to add())
        tiles: {
            "=": () => [
                sprite("floor"),
                area(),
                body({ isStatic: true }),
            ],
            "$": () => [
                sprite("coin"),
                area(),
                pos(0, -9),
            ],
            "^": () => [
                sprite("spike"),
                area(),
                "danger",
            ],
        }
    })


`returns`A game obj with the level.

`since`v2000.0



[getData](#getData)<T\>(key: string, def?: T): T | null
=======================================================

Get data from local storage, if not present can set to a default value.

`param`key\- The key to get data from.

`param`def\- The default value to set if not found.

`returns`The data or null if not found.

`since`v2000.0



[setData](#setData)(key: string, data: any): void
=================================================

Set data from local storage.

`param`key\- The key to set data to.

`param`data\- The data to set.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[screenshot](#screenshot)(): string
===================================

Take a screenshot and get the data url of the image.

`returns`The dataURL of the image.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[download](#download)(filename: string, dataurl: string): void
==============================================================

Trigger a file download from a url.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[downloadText](#downloadText)(filename: string, text: string): void
===================================================================

Trigger a text file download.

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[downloadJSON](#downloadJSON)(filename: string, data: any): void
================================================================

Trigger a json download from a .

`since`v3000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[downloadBlob](#downloadBlob)(filename: string, blob: Blob): void
=================================================================

Trigger a file download from a blob.

`since`v3000.0



[record](#record)(frameRate?: number): Recording
================================================

Start recording the canvas into a video. If framerate is not specified, a new frame will be captured each time the canvas changes.

`returns`A control handle.

`since`v2000.1



[Recording](#Recording):
========================

Screen recording control handle.

[pause](#Recording-pause)(): void
=================================

Pause the recording.

[resume](#Recording-resume)(): void
===================================

Resume the recording.

[stop](#Recording-stop)(): Promise<Blob\>
=========================================

Stop the recording and get the video data as mp4 Blob.

`since`v3000.0

[download](#Recording-download)(filename?: string): void
========================================================

Stop the recording and downloads the file as mp4. Trying to resume later will lead to error.



[debug](#debug): Debug
======================

The Debug interface for debugging stuff.

    // pause the whole game
    debug.paused = true

    // enter inspect mode
    debug.inspect = true


`returns`The debug interface.

`since`v2000.0



[Debug](#Debug):
================

[paused](#Debug-paused): boolean
================================

Pause the whole game.

[inspect](#Debug-inspect): boolean
==================================

Draw bounding boxes of all objects with \`area()\` component, hover to inspect their states.

[timeScale](#Debug-timeScale): number
=====================================

Global time scale.

[showLog](#Debug-showLog): boolean
==================================

Show the debug log or not.

[fps](#Debug-fps)(): number
===========================

Current frames per second.

[numFrames](#Debug-numFrames)(): number
=======================================

Total number of frames elapsed.

`since`v3000.0

[drawCalls](#Debug-drawCalls)(): number
=======================================

Number of draw calls made last frame.

[stepFrame](#Debug-stepFrame)(): void
=====================================

Step to the next frame. Useful with pausing.

[clearLog](#Debug-clearLog)(): void
===================================

Clear the debug log.

[log](#Debug-log)(msg: any): void
=================================

Log some text to on screen debug log.

[error](#Debug-error)(msg: any): void
=====================================

Log an error message to on screen debug log.

[curRecording](#Debug-curRecording): Recording | null
=====================================================

The recording handle if currently in recording mode.

`since`v2000.1

[numObjects](#Debug-numObjects)(): number
=========================================

Get total number of objects.

`since`v3001.0



[plug](#plug)<T\>(plugin: KAPLAYPlugin): KAPLAYCtx & T
======================================================

Import a plugin.

`param`plugin\- The plugin to import.

`returns`The updated context with the plugin.

`since`v2000.0



[system](#system)(name: string, cb: ()\=>void, when: LCEvents\[\]): void
========================================================================

Runs a system at the specified events in the pipeline

`param`nameThe name of the system. Overwrites an existing system if the name has been used before.

`param`cbThe function to run.

`param`whenWhen to run the function.

`since`v4000.0



[KAPLAYPlugin](#KAPLAYPlugin)<T\>(k: KAPLAYCtx): T | (args: any)\=>(k: KAPLAYCtx)\=>T
=====================================================================================

A plugin for KAPLAY.

    // a plugin that adds a new function to KAPLAY
    const myPlugin = (k) => ({
       myFunc: () => {
          k.debug.log("hello from my plugin")
      }
    })

    // use the plugin
    kaplay({
      plugins: [ myPlugin ]
    })

    // now you can use the new function
    myFunc()




[ASCII\_CHARS](#ASCII_CHARS): string
====================================

All chars in ASCII.

`since`v2000.0

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

[LEFT](#LEFT): Vec2
===================

Left directional vector vec2(-1, 0).

`since`v2000.0



[RIGHT](#RIGHT): Vec2
=====================

Right directional vector vec2(1, 0).

`since`v2000.0



[UP](#UP): Vec2
===============

Up directional vector vec2(0, -1).

`since`v2000.0



[DOWN](#DOWN): Vec2
===================

Down directional vector vec2(0, 1).

`since`v2000.0



[RED](#RED): Color
==================

Red color.

`since`v2000.0



[GREEN](#GREEN): Color
======================

Green color.

`since`v2000.0



[BLUE](#BLUE): Color
====================

Blue color.

`since`v2000.0



[YELLOW](#YELLOW): Color
========================

Yellow color.

`since`v2000.0



[MAGENTA](#MAGENTA): Color
==========================

Cyan color.

`since`v2000.0



[CYAN](#CYAN): Color
====================

Cyan color.

`since`v2000.0



[WHITE](#WHITE): Color
======================

White color.

`since`v2000.0



[BLACK](#BLACK): Color
======================

Black color.

`since`v2000.0



[ButtonBinding](#ButtonBinding):

[keyboard](#undefined-keyboard)?: Key | Key\[\]
===============================================

[keyboardCode](#undefined-keyboardCode)?: string | string\[\]
=============================================================

[gamepad](#undefined-gamepad)?: KGamepadButton | KGamepadButton\[\]
===================================================================

[mouse](#undefined-mouse)?: MouseButton | MouseButton\[\]
=========================================================




================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

A button binding.



[ButtonsDef](#ButtonsDef): Record<string, ButtonBinding\>
=========================================================

A buttons definition for an action (jump, walk-left, run).



[ButtonBindingDevice](#ButtonBindingDevice): keyboard | gamepad | mouse
=======================================================================

A button binding device

(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

Open in new tab

close

(()=>{var e=Object.defineProperty,t=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,n=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t\[r\]=o,s=(e,s)=>{for(var a in s||(s={}))r.call(s,a)&&n(e,a,s\[a\]);if(t)for(var a of t(s))o.call(s,a)&&n(e,a,s\[a\]);return e};((e,t)=>{const r="\_\_q\_context\_\_",o=window,n=new Set,a=new Set(\[e\]),c="replace",i="forEach",l="target",f="getAttribute",p="isConnected",b="qvisible",u="\_qwikjson\_",y=(e,t)=>Array.from(e.querySelectorAll(t)),h=e=>{const t=\[\];return a.forEach((r=>t.push(...y(r,e)))),t},d=e=>{S(e),y(e,"\[q\\\\:shadowroot\]").forEach((e=>{const t=e.shadowRoot;t&&d(t)}))},m=e=>e&&"function"==typeof e.then,w=(e,t,r=t.type)=>{h("\[on"+e+"\\\\:"+r+"\]")\[i\]((o=>E(o,e,t,r)))},q=t=>{if(void 0===t\[u\]){let r=(t===e.documentElement?e.body:t).lastElementChild;for(;r;){if("SCRIPT"===r.tagName&&"qwik/json"===r\[f\]("type")){t\[u\]=JSON.parse(r.textContent\[c\](/\\\\x3C(\\/?script)/gi,"<$1"));break}r=r.previousElementSibling}}},v=(e,t)=>new CustomEvent(e,{detail:t}),E=async(t,o,n,a=n.type)=>{const i="on"+o+":"+a;t.hasAttribute("preventdefault:"+a)&&n.preventDefault();const l=t.\_qc\_,b=l&&l.li.filter((e=>e\[0\]===i));if(b&&b.length>0){for(const e of b){const r=e\[1\].getFn(\[t,n\],(()=>t\[p\]))(n,t),o=n.cancelBubble;m(r)&&await r,o&&n.stopPropagation()}return}const u=t\[f\](i);if(u){const o=t.closest("\[q\\\\:container\]"),a=o\[f\]("q:base"),i=o\[f\]("q:version")||"unknown",l=o\[f\]("q:manifest-hash")||"dev",b=new URL(a,e.baseURI);for(const f of u.split("\\n")){const u=new URL(f,b),y=u.href,h=u.hash\[c\](/^#?(\[^?\[|\]\*).\*$/,"$1")||"default",d=performance.now();let w,v,E;const \_=f.startsWith("#"),A={qBase:a,qManifest:l,qVersion:i,href:y,symbol:h,element:t,reqTime:d};if(\_){const t=o.getAttribute("q:instance");w=(e\["qFuncs\_"+t\]||\[\])\[Number.parseInt(h)\],w||(v="sync",E=Error("sync handler error for symbol: "+h))}else{const e=u.href.split("#")\[0\];try{const t=import(e);q(o),w=(await t)\[h\],w||(v="no-symbol",E=Error(\`${h} not in ${e}\`))}catch(e){v||(v="async"),E=e}}if(!w){g("qerror",s({importError:v,error:E},A)),console.error(E);break}const k=e\[r\];if(t\[p\])try{e\[r\]=\[t,n,u\],\_||g("qsymbol",s({},A));const o=w(n,t);m(o)&&await o}catch(e){g("qerror",s({error:e},A))}finally{e\[r\]=k}}}},g=(t,r)=>{e.dispatchEvent(v(t,r))},\_=e=>e\[c\](/(\[A-Z\])/g,(e=>"-"+e.toLowerCase())),A=async e=>{let t=\_(e.type),r=e\[l\];for(w("-document",e,t);r&&r\[f\];){const o=E(r,"",e,t);let n=e.cancelBubble;m(o)&&await o,n=n||e.cancelBubble||r.hasAttribute("stoppropagation:"+e.type),r=e.bubbles&&!0!==n?r.parentElement:null}},k=e=>{w("-window",e,\_(e.type))},C=()=>{var r;const s=e.readyState;if(!t&&("interactive"==s||"complete"==s)&&(a.forEach(d),t=1,g("qinit"),(null!=(r=o.requestIdleCallback)?r:o.setTimeout).bind(o)((()=>g("qidle"))),n.has(b))){const e=h("\[on\\\\:"+b+"\]"),t=new IntersectionObserver((e=>{for(const r of e)r.isIntersecting&&(t.unobserve(r\[l\]),E(r\[l\],"",v(b,r)))}));e\[i\]((e=>t.observe(e)))}},O=(e,t,r,o=!1)=>e.addEventListener(t,r,{capture:o,passive:!1}),S=(...e)=>{for(const t of e)"string"==typeof t?n.has(t)||(a.forEach((e=>O(e,t,A,!0))),O(o,t,k,!0),n.add(t)):a.has(t)||(n.forEach((e=>O(t,e,A,!0))),a.add(t))};if(!(r in e)){e\[r\]=0;const t=o.qwikevents;Array.isArray(t)&&S(...t),o.qwikevents={events:n,roots:a,push:S},O(e,"readystatechange",C),C()}})(document)})()((b,h2,c,q,v)=>{c.register("/qwik-prefetch-service-worker.js",{scope:"/"}).then((sw,onReady)=>{onReady=()=>q.forEach(q.push=(v2)=>sw.active.postMessage(v2)),sw.installing?sw.installing.addEventListener("statechange",(e)=>"activated"==e.target.state&&onReady()):onReady();}),v&&q.push(\["verbose"\]),document.addEventListener("qprefetch",(e)=>e.detail.bundles&&q.push(\["prefetch",b,...e.detail.bundles\]));})("/build/","96pbww",navigator.serviceWorker,window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\]),false);(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\])(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["prefetch","/build/","q-DcUaCaVY.js","q-Bav6Xjn9.js"\]);document.dispatchEvent(new CustomEvent('qprefetch', {detail:{links: \[location.pathname\]}})){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}(window.qwikevents||=\[\]).push("onSetDocPreview")

[

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAAxCAYAAABtVXGvAAAAAXNSR0IArs4c6QAAAjBJREFUaIHtms2RwjAMhQ1DAVABOZM+toHtYAujAxqgDziHCqAD9pQdryNZP5Ytw/COgGV9eoodJ6yCk/bbw9M65u1xXUl+L/qxhWpAQ+IUogl8K+BUVAGqwntBx8oVoAq8BPp8OhbP9/X9k/0eK4AZvNRlC2hIWCGgAhTDt3aZI24B1PBc6FbAqaACmMBzwL2gY1EF2EiCeUFTC5p2TpbzvUJzcsi5TzpPgfcAHY+T5IM67wEdgh48VppbGnN2fg0NzoGfT0c38Ol+MYkz84HwmLxW8Ol+CdP9EobdyB4TFwDLewGPud4CHJqD4za3I1L9g/cEx8R1W1MAsu17uFnhSHJJzMrCe4BDcw67MQy7EXVXAx5CBN/D2ZuSBJIybr89PFHnPdu9dG7ueNFW11LaAmDjoM83IfTb8nPCnLs+TbFEpzov1boEwbZ/le2tVOteW76FFm3PPRO/Q3eQqz222FgcPb2VXfAoQOnDgxLV6D4Uvhdnc3nM32mLALY99txL+ha0VFwDtEZ1e4cnlaYAC3jOw/4W0sBIx7yc89TlJynA5va4rnI3OqWuW75wiHOh8ubksU6DYpNpxHGB6xSUS2l+f1udx3VtIWkHxONe7pq3VDX4Xu4Vcvo430ItHecuoh/nvVV6iNJ2VRfwqSxOlHEMLJ64YtCeSr0PD2HpjnRvptzVxDOB506mjcNta27M7J8TLBKhxnDj1Nwlqv8Pr6RdNeBUXnHMoqpKJupRvzxYOJ5g2KNtAAAAAElFTkSuQmCC)

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA8CAYAAAApK5mGAAAAAXNSR0IArs4c6QAAAgRJREFUaIHtmktywyAMhmWPD5CcIFnHM7lbTtK7dSZexyeIb5BuSsfFgB4grKb8q9Yg0IfEwzgdCHU6XF5SW6rmZeq4NmyDGiC+OGDkinuA+KKAoRUsgKyFQSULKTAfn3euT6hu1zFZnoKKFqRgNCBCSoHFoIIPYzC1QHzFwEJQmwfWYNYKgflQv/6xDOOEQfXuj78AQ1GfKrQIE/JpHYzBf5AydEqtPpJBKNleB0ADwvYGiSOcNjF/3DwKplwuDGZzu47sNrH6LijJOZSrkBOSweHYokA5DpSwjymW0j338Pl4xudGqqxWe6oph0niMKYNELY6nY9j0JHH8w7nIy+9uPUpEkUo5EjMuZoDBEAAyjktUG05A4SJFCEJVMxG+zhFTjmOI1hdKRRmdzpcXp2/bNc8kFL3KM65csjyKFMag7frPqShBmRdDci6GpB1NSDrakDW1YCsS3zaLn0dXEoiIOw9xpVjYJT3Ie7gsFOOc3GIXQeX7g+ACaR1C1qy3+w3Vv+T4N4/AyADUb5vlmxLOjBvt2yLgaTR0W6rRci6/ieQ9mfEkqoeIW3AzT7kn8O4+8+8TJv78ppRGkIO1HSi5JINIEg5igNUJ0vDAHwDaTiA1eXCUDPmZw6tOwiloGQ0NSKwVghStcNcSQ6ob7WxzsvUmY4QAD1KLr3NAwHgUOu5+gU1E/8vo/BmaAAAAABJRU5ErkJggg==)

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAkCAYAAAAHKVPcAAAAAXNSR0IArs4c6QAAAS9JREFUWIXNl8kVhCAMhoFnAVqBnrX/UvSsFWgHzsl5jmb5w+KYIybkI5vgnUHaut8t+ss2eUQPUrI6t4KoCikAKIwIkQtAA2EhOIB5HSGHXTPAICQEBYA6jwG5QeQC0GDOID8QJQAQkC8ECsCFONZ22SYf0E26ZoABOIdcVINzeitanMfYkZE4E8cCoPZt3e9sOqQNpGLVaoH6HixTcV5HN6+jejprR90ikaMlrSmscm9u6YpDxJrIERVkDxEiFQS1VSFiQTgbKl1wTVAT1OKck2WbvKkwU5xJAqWjtLwTIvVfEQWBvg2KQjzpjIvyX2viyMI7C7OUSAVPQjzRIeeGqI4F7nIj3Yq4b9d17VDilb+UXMfCKwpTfYHlFmo4Bk1BWrfaZJvObd3vlogh+h8/8qiULfYm6gAAAABJRU5ErkJggg==)

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD0AAAA6CAYAAAADZ1FRAAAAAXNSR0IArs4c6QAAAsRJREFUaIHdm91NAzEMx32nDkAnoM9UDNIFGIAOwCwMAAN0AQZB9JlOQDeAF1Kdrrbjz1zUv4SEdPn62U7iS64D3JDu7x5+a2VO5+MwYIVP5+OQNbAMSWCnGmoVejaAFraoCj1VLwawwhapoIuWgpeO9bDfXf5/evu4er7ydt7CABZYSqfzcbiCLhUxC9UGhBnAE0leWIqB9HQtRDB555qmHYlXKY2SQof9ztVJtCRjwRxVIghdyKyNtlRtjBy0aSGzAH++v4jKPT6/qsaAwXPAAACr0/mo2rY0wFJQqo7EABw8JXKVlFqwyAKokcQAh/2u6mUAIfSSsHNJw38qFBqABu8JeCopPJY7sNCclgSeqgbPQgPIwTXAUo94jEj1QaXIqi0rAxYrHxFF3DuBOFeWDMSyyFDyGpiDFqWh1o5btYcZiJuqo6RgzepW4O+fr5R2a6p62gvMgW3WW/j++br8eaTx9oorYAWeAmzWW7aNeT1NeavC5nSRFZiSd25jIqElDfSSoGgV7mmPd1uENsA/dNQxT1EZfG1xKs83620zYIAAT1MhLgGRlMmYQii0tqOMgX2+v4S0i0Vx2JyOBM9eIMfI+ewdbIR3JfVNB4PWTqPfpKy6gs4cTC/7evg+vbQkGdzNQUt089DYYcIVdNY7bE9q6unH59dUo0rbHiMu1QsM1+n02dLR5Pb0HCACKCoiKId2t5C1iAgU2tPZUgmIZswjQOzHMljnS8/hudLDWwNsNY72sJ+9wIv+esAi681KkxuODGUAA0ygsYItbhw9bVojrNnJieaAwAMsWZRFt5a9vAcD8N6V7kKhV7WZsnxxQAkt2AO4Zr5q8wyyMHdgmAFvXZQsiRVbQXJSqjVA1J7uySKrFTVHxHMDZCQtESmzqIHouy6NMj6iVzXYAr7FLwXMHXgNsOSPYEI6lhqgl1/7/AGdp5Ixi1pUmwAAAABJRU5ErkJggg==)

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFkAAAA6CAMAAADstQVpAAAAAXNSR0IArs4c6QAAAGBQTFRFW6Z1a8lsq91k/O+N/7h56mJizEJeoyhYdRdWOQlHYRhRhzVVplVfyXNz8q6Z/8Py7o/L1G6zhz6EHxAqSjBSe1SApoWf2b3I////ruL/jbf/bYD6hGXsg03EfS2gThh8N+EO7gAAACB0Uk5TAP////////////////////////////////////////+Smq12AAABXUlEQVRYhe3X2w6DIAwGYF7AG3n/d92yCZYe6N+iW5asF0sw3WfBqljKJ6O2uEcN8W6WZB2bJVnZhqtkD9KZYxRCk/Z3WHQ7htXB1R4yezI3hTZYYuvw9ozXbx8yeuJ2m+YSqUUfyjIEptOkVAqPp5jD9BCTVZHKlcja/MdhAWVCa2u8Ip90RyhmLQYiN7qXZ/aHaA2IHktWZaVDPXmDZK31g/IOwFXcIZCMrTECo3IK9mSlZN+F5di1y9SMyxWQU0W3cqK9ga6FJ2doUE4/NfSH6JxGZbfoWIMcdxMmR57PNSZD70GyORjexjDd5XYCshkY1wIreh/kup37CzLscgnIfIpHMJm5yHLInrajFEZ7rtirIfB8W6f84zjASAWebUX1UpQzqAkWbc4xEgQR6tI3VuCaXCcvuTfKX1mMNXoOL9AenKZ9OCkDcJL+y78u39d1AJ2FYy/jK+2s+QDn59sMvtpgyAAAAABJRU5ErkJggg==)

![KAFriend](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA0CAYAAADfRPtlAAAAAXNSR0IArs4c6QAAAedJREFUaIHtms2NAyEMhd+MUsB2sIpy27ZSV9rKbbVKB+kge5qIEAP+YzBS3imKBuwPM4wxLDDq++vnYe2jpdv9umjbqhvuAZZLA6oCHAGXSgIqAvQE+/07P3+fjhdxey4kG7AFlzrspRY4B7L5wAiwXBbQKmANbg+wXDXQEmQRMBpcqhIoBUkCRobbxIVkA0YBS8WBfAOcBW5TC3JtdRAZDij7twVqpf6cTbUgvEzRHHDkp0Bjm5quzwhGiF7qoCZ9owal+A5yR/B0vKic2UvNRaYm64jnSgfV6/U4ADGm5ybv956MINdIjxH31sEavahgm94iGN1hqUyLzAz6AM6uD+DsmgKQmw5Wk+2osqSDt/t1CQ3okd+GBpSoNBhhASmHJVkWuybDcWT0frBmP9R+sNaXJnoAAWhx1APSezasltNTSj0GqBa9lr0FsFXTagYkdR1NH1Q7snRvrWb3WmRaPuR2qdno8pnosUmWwpW0ArZbDFyHJP1o+ioxFCOoLbxaQD3e2VzV0r3E6F7iLCypwqZqlDSzaprzQcmxdSrREfYoUC0coLiEsDekBQ4Ifo3ECgc4XAQC/GE192FKYj0sOb/QwnJWyK63DUcfsWmzrfDXKa1ppKlxb1CPHNl1s2sF9t58A8A/00UHqR2QHnEAAAAASUVORK5CYII=)



](/crew)

### KAPLAY

[Installing KAPLAY](/guides/install) [Basics of KAPLAY](/guides/starting) [Components of KAPLAY](/guides/components)

### Resources

[Start playing around with KAPLAYGROUND](https://play.kaplayjs.com) [Ask questions on Discord](https://discord.com/invite/aQ6RuQm3TF) [Press Kit](/presskit) [Become a Bean Wizard now!](/books/how_to_be_a_bean_wizard/introduction)

### PRESENCE

[GitHub](https://github.com/kaplayjs/kaplay) [Discord](https://discord.com/invite/aQ6RuQm3TF) [YouTube](https://www.youtube.com/@kaplayjs) [Twitter/X](https://x.com/kaplayjs) [Mastodon](https://mastodon.gamedev.place/@kaplay) [Bluesky](https://bsky.app/profile/kaplayjs.com) [Itch.io](https://kaplay.itch.io/) [Reddit](https://www.reddit.com/r/KaplayJS/)

### SUPPORT

 [![Donate in Open Collective](https://opencollective.com/webpack/donate/button@2x.png?color=blue)](https://opencollective.com/kaplay/donate)[![Cómprame un café (Donation for Argentina)](/cafecito.svg)](https://cafecito.app/kaplay)

![kaplay logo](/_astro/kaplay-o.7XXxwoUM_1mRifk.webp) [![Colyseus](/_astro/colyseus.Dpm2WJ_c_Z1HIOOd.webp)](https://colyseus.io)

[![kaplay logo](/kaplay.webp)](/./)

 ![search icon](/_astro/search.DIoBesap.png) SEARCH CTRL + K

v4000 alpha v3001 v3000 (kaboom.js)

*   [![Home Icon](/_astro/home_icon.BsfwuuRw.png)Home](/)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/discord_icon.Cgn9ToiX.png) Discord](https://kaboomjs.com/discord)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/gh_icon.DhxYlUoo.png) GitHub](https://github.com/kaplayjs/kaplay)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/pog_icon.BmYk55--.png) Changelog](/changelog)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/controller_icon.Bi33tMQ3.png) KA-PLAYGROUND](https://play.kaplayjs.com)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/donate_icon.V3NqqYn6.png) Donate to KAPLAY](https://opencollective.com/kaplay)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/guides_icon.DZvKwpu5.png) Guides](/guides/install)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/api_icon.CMlRdd1F.png) API Docs](/doc/kaplay)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

*    [![Home Icon](/_astro/blog_icon.j7-Oh00b.png) Blog](/blog)
(window.qwikPrefetchSW||(window.qwikPrefetchSW=\[\])).push(\["graph-url","/build/","q-bundle-graph-96pbww.json"\]){"refs":{},"ctx":{},"objs":\[\],"subs":\[\]}

Start

*   [kaplay](/doc/kaplay)
*   [quit](/doc/ctx/quit)
*   [KAPLAYOpt](/doc/KAPLAYOpt)

Assets

*   [loadRoot](/doc/ctx/loadRoot)
*   [loadSprite](/doc/ctx/loadSprite)
*   [loadSpriteAtlas](/doc/ctx/loadSpriteAtlas)
*   [loadAseprite](/doc/ctx/loadAseprite)
*   [loadPedit](/doc/ctx/loadPedit)
*   [loadBean](/doc/ctx/loadBean)
*   [loadJSON](/doc/ctx/loadJSON)
*   [loadSound](/doc/ctx/loadSound)
*   [loadMusic](/doc/ctx/loadMusic)
*   [loadFont](/doc/ctx/loadFont)
*   [loadBitmapFont](/doc/ctx/loadBitmapFont)
*   [loadShader](/doc/ctx/loadShader)
*   [loadShaderURL](/doc/ctx/loadShaderURL)
*   [load](/doc/ctx/load)
*   [loadProgress](/doc/ctx/loadProgress)
*   [getSprite](/doc/ctx/getSprite)
*   [getSound](/doc/ctx/getSound)
*   [getFont](/doc/ctx/getFont)
*   [getBitmapFont](/doc/ctx/getBitmapFont)
*   [getShader](/doc/ctx/getShader)
*   [getAsset](/doc/ctx/getAsset)
*   [Asset](/doc/Asset)
*   [SpriteData](/doc/SpriteData)
*   [SoundData](/doc/SoundData)

Game Obj

*   [add](/doc/ctx/add)
*   [make](/doc/ctx/make)
*   [readd](/doc/ctx/readd)
*   [get](/doc/ctx/get)
*   [query](/doc/ctx/query)
*   [destroy](/doc/ctx/destroy)
*   [destroyAll](/doc/ctx/destroyAll)
*   [KeepFlags](/doc/KeepFlags)
*   [GameObjRaw](/doc/GameObjRaw)
*   [GameObj](/doc/GameObj)
*   [GameObjID](/doc/GameObjID)

Components

*   [pos](/doc/ctx/pos)
*   [scale](/doc/ctx/scale)
*   [rotate](/doc/ctx/rotate)
*   [color](/doc/ctx/color)
*   [opacity](/doc/ctx/opacity)
*   [sprite](/doc/ctx/sprite)
*   [text](/doc/ctx/text)
*   [polygon](/doc/ctx/polygon)
*   [rect](/doc/ctx/rect)
*   [circle](/doc/ctx/circle)
*   [ellipse](/doc/ctx/ellipse)
*   [uvquad](/doc/ctx/uvquad)
*   [area](/doc/ctx/area)
*   [anchor](/doc/ctx/anchor)
*   [z](/doc/ctx/z)
*   [outline](/doc/ctx/outline)
*   [particles](/doc/ctx/particles)
*   [body](/doc/ctx/body)
*   [surfaceEffector](/doc/ctx/surfaceEffector)
*   [areaEffector](/doc/ctx/areaEffector)
*   [pointEffector](/doc/ctx/pointEffector)
*   [platformEffector](/doc/ctx/platformEffector)
*   [buoyancyEffector](/doc/ctx/buoyancyEffector)
*   [constantForce](/doc/ctx/constantForce)
*   [doubleJump](/doc/ctx/doubleJump)
*   [move](/doc/ctx/move)
*   [offscreen](/doc/ctx/offscreen)
*   [follow](/doc/ctx/follow)
*   [shader](/doc/ctx/shader)
*   [textInput](/doc/ctx/textInput)
*   [timer](/doc/ctx/timer)
*   [fixed](/doc/ctx/fixed)
*   [stay](/doc/ctx/stay)
*   [health](/doc/ctx/health)
*   [lifespan](/doc/ctx/lifespan)
*   [named](/doc/ctx/named)
*   [state](/doc/ctx/state)
*   [fadeIn](/doc/ctx/fadeIn)
*   [mask](/doc/ctx/mask)
*   [drawon](/doc/ctx/drawon)
*   [tile](/doc/ctx/tile)
*   [agent](/doc/ctx/agent)
*   [animate](/doc/ctx/animate)
*   [fakeMouse](/doc/ctx/fakeMouse)
*   [serializeAnimation](/doc/ctx/serializeAnimation)
*   [sentry](/doc/ctx/sentry)
*   [patrol](/doc/ctx/patrol)
*   [pathfinder](/doc/ctx/pathfinder)
*   [Comp](/doc/Comp)

Component Types

*   [CircleComp](/doc/CircleComp)
*   [CircleCompOpt](/doc/CircleCompOpt)
*   [ColorComp](/doc/ColorComp)
*   [EllipseComp](/doc/EllipseComp)
*   [EllipseCompOpt](/doc/EllipseCompOpt)
*   [MaskComp](/doc/MaskComp)
*   [OpacityComp](/doc/OpacityComp)
*   [OutlineComp](/doc/OutlineComp)
*   [ParticlesOpt](/doc/ParticlesOpt)
*   [ParticlesComp](/doc/ParticlesComp)
*   [PolygonComp](/doc/PolygonComp)
*   [PolygonCompOpt](/doc/PolygonCompOpt)
*   [RectComp](/doc/RectComp)
*   [RectCompOpt](/doc/RectCompOpt)
*   [ShaderComp](/doc/ShaderComp)
*   [SpriteComp](/doc/SpriteComp)
*   [SpriteCompOpt](/doc/SpriteCompOpt)
*   [TextComp](/doc/TextComp)
*   [TextCompOpt](/doc/TextCompOpt)
*   [UVQuadComp](/doc/UVQuadComp)
*   [AgentComp](/doc/AgentComp)
*   [AgentCompOpt](/doc/AgentCompOpt)
*   [FixedComp](/doc/FixedComp)
*   [PosComp](/doc/PosComp)
*   [SentryComp](/doc/SentryComp)
*   [SentryCompOpt](/doc/SentryCompOpt)
*   [TileComp](/doc/TileComp)
*   [TileCompOpt](/doc/TileCompOpt)
*   [HealthComp](/doc/HealthComp)
*   [LifespanCompOpt](/doc/LifespanCompOpt)
*   [NamedComp](/doc/NamedComp)
*   [StateComp](/doc/StateComp)
*   [StayComp](/doc/StayComp)
*   [TextInputComp](/doc/TextInputComp)
*   [TimerComp](/doc/TimerComp)
*   [AreaComp](/doc/AreaComp)
*   [AreaCompOpt](/doc/AreaCompOpt)
*   [BodyComp](/doc/BodyComp)
*   [BodyCompOpt](/doc/BodyCompOpt)
*   [DoubleJumpComp](/doc/DoubleJumpComp)
*   [AnchorComp](/doc/AnchorComp)
*   [FollowComp](/doc/FollowComp)
*   [LayerComp](/doc/LayerComp)
*   [OffScreenComp](/doc/OffScreenComp)
*   [OffScreenCompOpt](/doc/OffScreenCompOpt)
*   [RotateComp](/doc/RotateComp)
*   [ScaleComp](/doc/ScaleComp)
*   [ZComp](/doc/ZComp)
*   [MergeComps](/doc/MergeComps)
*   [CompList](/doc/CompList)
*   [EmptyComp](/doc/EmptyComp)
*   [LevelComp](/doc/LevelComp)

Scene

*   [getSceneName](/doc/ctx/getSceneName)
*   [scene](/doc/ctx/scene)
*   [go](/doc/ctx/go)
*   [layers](/doc/ctx/layers)

Input

*   [onGamepadConnect](/doc/ctx/onGamepadConnect)
*   [onGamepadDisconnect](/doc/ctx/onGamepadDisconnect)
*   [onClick](/doc/ctx/onClick)
*   [onKeyDown](/doc/ctx/onKeyDown)
*   [onKeyPress](/doc/ctx/onKeyPress)
*   [onKeyPressRepeat](/doc/ctx/onKeyPressRepeat)
*   [onKeyRelease](/doc/ctx/onKeyRelease)
*   [onCharInput](/doc/ctx/onCharInput)
*   [onMouseDown](/doc/ctx/onMouseDown)
*   [onMousePress](/doc/ctx/onMousePress)
*   [onMouseRelease](/doc/ctx/onMouseRelease)
*   [onMouseMove](/doc/ctx/onMouseMove)
*   [onTouchStart](/doc/ctx/onTouchStart)
*   [onTouchMove](/doc/ctx/onTouchMove)
*   [onTouchEnd](/doc/ctx/onTouchEnd)
*   [onScroll](/doc/ctx/onScroll)
*   [onGamepadButtonDown](/doc/ctx/onGamepadButtonDown)
*   [onGamepadButtonPress](/doc/ctx/onGamepadButtonPress)
*   [onGamepadButtonRelease](/doc/ctx/onGamepadButtonRelease)
*   [onGamepadStick](/doc/ctx/onGamepadStick)
*   [onButtonPress](/doc/ctx/onButtonPress)
*   [onButtonRelease](/doc/ctx/onButtonRelease)
*   [onButtonDown](/doc/ctx/onButtonDown)
*   [isTouchscreen](/doc/ctx/isTouchscreen)
*   [mousePos](/doc/ctx/mousePos)
*   [mouseDeltaPos](/doc/ctx/mouseDeltaPos)
*   [isKeyDown](/doc/ctx/isKeyDown)
*   [isKeyPressed](/doc/ctx/isKeyPressed)
*   [isKeyPressedRepeat](/doc/ctx/isKeyPressedRepeat)
*   [isKeyReleased](/doc/ctx/isKeyReleased)
*   [isMouseDown](/doc/ctx/isMouseDown)
*   [isMousePressed](/doc/ctx/isMousePressed)
*   [isMouseReleased](/doc/ctx/isMouseReleased)
*   [isMouseMoved](/doc/ctx/isMouseMoved)
*   [isGamepadButtonPressed](/doc/ctx/isGamepadButtonPressed)
*   [isGamepadButtonDown](/doc/ctx/isGamepadButtonDown)
*   [isGamepadButtonReleased](/doc/ctx/isGamepadButtonReleased)
*   [isButtonPressed](/doc/ctx/isButtonPressed)
*   [isButtonDown](/doc/ctx/isButtonDown)
*   [isButtonReleased](/doc/ctx/isButtonReleased)
*   [getButton](/doc/ctx/getButton)
*   [setButton](/doc/ctx/setButton)
*   [pressButton](/doc/ctx/pressButton)
*   [releaseButton](/doc/ctx/releaseButton)
*   [getGamepadStick](/doc/ctx/getGamepadStick)
*   [getLastInputDeviceType](/doc/ctx/getLastInputDeviceType)
*   [charInputted](/doc/ctx/charInputted)
*   [Key](/doc/Key)
*   [MouseButton](/doc/MouseButton)
*   [KGamepadButton](/doc/KGamepadButton)
*   [GamepadStick](/doc/GamepadStick)

Events

*   [KEventController](/doc/KEventController)
*   [GameObjEventMap](/doc/GameObjEventMap)
*   [trigger](/doc/ctx/trigger)
*   [on](/doc/ctx/on)
*   [onFixedUpdate](/doc/ctx/onFixedUpdate)
*   [onUpdate](/doc/ctx/onUpdate)
*   [onDraw](/doc/ctx/onDraw)
*   [onAdd](/doc/ctx/onAdd)
*   [onDestroy](/doc/ctx/onDestroy)
*   [onUse](/doc/ctx/onUse)
*   [onUnuse](/doc/ctx/onUnuse)
*   [onTag](/doc/ctx/onTag)
*   [onUntag](/doc/ctx/onUntag)
*   [onLoad](/doc/ctx/onLoad)
*   [onLoadError](/doc/ctx/onLoadError)
*   [onLoading](/doc/ctx/onLoading)
*   [onError](/doc/ctx/onError)
*   [onResize](/doc/ctx/onResize)
*   [onCleanup](/doc/ctx/onCleanup)
*   [onCollide](/doc/ctx/onCollide)
*   [onCollideUpdate](/doc/ctx/onCollideUpdate)
*   [onHover](/doc/ctx/onHover)
*   [onHoverUpdate](/doc/ctx/onHoverUpdate)
*   [onHoverEnd](/doc/ctx/onHoverEnd)
*   [onHide](/doc/ctx/onHide)
*   [onShow](/doc/ctx/onShow)
*   [onSceneLeave](/doc/ctx/onSceneLeave)
*   [KEvent](/doc/KEvent)
*   [KEventHandler](/doc/KEventHandler)
*   [KEventController](/doc/KEventController)
*   [cancel](/doc/ctx/cancel)

Info

*   [width](/doc/ctx/width)
*   [getTreeRoot](/doc/ctx/getTreeRoot)
*   [height](/doc/ctx/height)
*   [center](/doc/ctx/center)
*   [dt](/doc/ctx/dt)
*   [fixedDt](/doc/ctx/fixedDt)
*   [restDt](/doc/ctx/restDt)
*   [time](/doc/ctx/time)
*   [isFocused](/doc/ctx/isFocused)
*   [setBackground](/doc/ctx/setBackground)
*   [getBackground](/doc/ctx/getBackground)
*   [getGamepads](/doc/ctx/getGamepads)
*   [setCursor](/doc/ctx/setCursor)
*   [getCursor](/doc/ctx/getCursor)
*   [setCursorLocked](/doc/ctx/setCursorLocked)
*   [isCursorLocked](/doc/ctx/isCursorLocked)
*   [setFullscreen](/doc/ctx/setFullscreen)
*   [isFullscreen](/doc/ctx/isFullscreen)
*   [canvas](/doc/ctx/canvas)
*   [VERSION](/doc/ctx/VERSION)

Timer

*   [wait](/doc/ctx/wait)
*   [loop](/doc/ctx/loop)
*   [TimerController](/doc/TimerController)
*   [TweenController](/doc/TweenController)

Math

*   [Color](/doc/Color)
*   [Vec2Args](/doc/Vec2Args)
*   [Vec2](/doc/Vec2)
*   [Quad](/doc/Quad)
*   [Mat4](/doc/Mat4)
*   [RNG](/doc/RNG)
*   [ShapeType](/doc/ShapeType)
*   [RaycastHit](/doc/RaycastHit)
*   [RaycastResult](/doc/RaycastResult)
*   [Line](/doc/Line)
*   [Rect](/doc/Rect)
*   [Circle](/doc/Circle)
*   [Ellipse](/doc/Ellipse)
*   [Polygon](/doc/Polygon)
*   [UniformValue](/doc/UniformValue)
*   [UniformKey](/doc/UniformKey)
*   [Uniform](/doc/Uniform)
*   [raycast](/doc/ctx/raycast)
*   [vec2](/doc/ctx/vec2)
*   [rgb](/doc/ctx/rgb)
*   [hsl2rgb](/doc/ctx/hsl2rgb)
*   [quad](/doc/ctx/quad)
*   [chance](/doc/ctx/chance)
*   [lerp](/doc/ctx/lerp)
*   [tween](/doc/ctx/tween)
*   [easings](/doc/ctx/easings)
*   [easingSteps](/doc/ctx/easingSteps)
*   [easingLinear](/doc/ctx/easingLinear)
*   [easingCubicBezier](/doc/ctx/easingCubicBezier)
*   [map](/doc/ctx/map)
*   [mapc](/doc/ctx/mapc)
*   [wave](/doc/ctx/wave)
*   [deg2rad](/doc/ctx/deg2rad)
*   [rad2deg](/doc/ctx/rad2deg)
*   [clamp](/doc/ctx/clamp)
*   [evaluateQuadratic](/doc/ctx/evaluateQuadratic)
*   [evaluateQuadraticFirstDerivative](/doc/ctx/evaluateQuadraticFirstDerivative)
*   [evaluateQuadraticSecondDerivative](/doc/ctx/evaluateQuadraticSecondDerivative)
*   [evaluateBezier](/doc/ctx/evaluateBezier)
*   [evaluateBezierFirstDerivative](/doc/ctx/evaluateBezierFirstDerivative)
*   [evaluateBezierSecondDerivative](/doc/ctx/evaluateBezierSecondDerivative)
*   [evaluateCatmullRom](/doc/ctx/evaluateCatmullRom)
*   [evaluateCatmullRomFirstDerivative](/doc/ctx/evaluateCatmullRomFirstDerivative)
*   [curveLengthApproximation](/doc/ctx/curveLengthApproximation)
*   [normalizedCurve](/doc/ctx/normalizedCurve)
*   [testLinePoint](/doc/ctx/testLinePoint)
*   [testLineLine](/doc/ctx/testLineLine)
*   [testLineCircle](/doc/ctx/testLineCircle)
*   [testRectRect](/doc/ctx/testRectRect)
*   [testRectLine](/doc/ctx/testRectLine)
*   [testRectPoint](/doc/ctx/testRectPoint)
*   [testCirclePolygon](/doc/ctx/testCirclePolygon)
*   [clipLineToRect](/doc/ctx/clipLineToRect)
*   [clipLineToCircle](/doc/ctx/clipLineToCircle)
*   [gjkShapeIntersects](/doc/ctx/gjkShapeIntersects)
*   [gjkShapeIntersection](/doc/ctx/gjkShapeIntersection)
*   [isConvex](/doc/ctx/isConvex)
*   [triangulate](/doc/ctx/triangulate)
*   [NavMesh](/doc/NavMesh)
*   [Point](/doc/Point)
*   [Line](/doc/Line)
*   [Rect](/doc/Rect)
*   [Circle](/doc/Circle)
*   [Ellipse](/doc/Ellipse)
*   [Polygon](/doc/Polygon)
*   [Vec2](/doc/Vec2)
*   [Color](/doc/Color)
*   [Mat4](/doc/Mat4)
*   [Mat23](/doc/Mat23)
*   [Quad](/doc/Quad)
*   [RNG](/doc/RNG)
*   [LerpValue](/doc/LerpValue)
*   [RNGValue](/doc/RNGValue)
*   [Collision](/doc/Collision)
*   [Edge](/doc/Edge)
*   [EdgeMask](/doc/EdgeMask)
*   [EaseFuncs](/doc/EaseFuncs)
*   [EaseFunc](/doc/EaseFunc)

Misc

*   [RGBValue](/doc/RGBValue)
*   [RGBAValue](/doc/RGBAValue)
*   [ColorArgs](/doc/ColorArgs)
*   [Mat2](/doc/Mat2)
*   [Mat23](/doc/Mat23)
*   [Point](/doc/Point)
*   [StepPosition](/doc/StepPosition)
*   [DrawCurveOpt](/doc/DrawCurveOpt)
*   [DrawBezierOpt](/doc/DrawBezierOpt)
*   [DrawCircleOpt](/doc/DrawCircleOpt)
*   [GfxCtx](/doc/GfxCtx)
*   [Texture](/doc/Texture)
*   [VertexFormat](/doc/VertexFormat)
*   [BatchRenderer](/doc/BatchRenderer)
*   [Mesh](/doc/Mesh)
*   [initGfx](/doc/initGfx)
*   [GfxFont](/doc/GfxFont)
*   [BitmapFontData](/doc/BitmapFontData)
*   [LoadBitmapFontOpt](/doc/LoadBitmapFontOpt)
*   [FontData](/doc/FontData)
*   [CharTransformFunc](/doc/CharTransformFunc)
*   [FormattedText](/doc/FormattedText)
*   [FormattedChar](/doc/FormattedChar)
*   [DrawLineOpt](/doc/DrawLineOpt)
*   [LineJoin](/doc/LineJoin)
*   [LineCap](/doc/LineCap)
*   [DrawLinesOpt](/doc/DrawLinesOpt)
*   [DrawRectOpt](/doc/DrawRectOpt)
*   [GjkCollisionResult](/doc/GjkCollisionResult)
*   [Graph](/doc/Graph)
*   [Grid](/doc/Grid)
*   [NavEdge](/doc/NavEdge)
*   [NavPolygon](/doc/NavPolygon)
*   [NavMesh](/doc/NavMesh)
*   [SatResult](/doc/SatResult)
*   [EmitterOpt](/doc/EmitterOpt)
*   [Registry](/doc/Registry)
*   [KEvent](/doc/KEvent)
*   [KEventHandler](/doc/KEventHandler)
*   [BinaryHeap](/doc/BinaryHeap)
*   [PathfinderMapComp](/doc/PathfinderMapComp)
*   [PathfinderMapCompOpt](/doc/PathfinderMapCompOpt)
*   [PathfinderComp](/doc/PathfinderComp)
*   [PathfinderCompOpt](/doc/PathfinderCompOpt)
*   [PatrolComp](/doc/PatrolComp)
*   [PatrolEndBehavior](/doc/PatrolEndBehavior)
*   [PatrolCompOpt](/doc/PatrolCompOpt)
*   [SentryCandidatesCb](/doc/SentryCandidatesCb)
*   [SentryCandidates](/doc/SentryCandidates)
*   [TimeDirection](/doc/TimeDirection)
*   [Interpolation](/doc/Interpolation)
*   [AnimateOpt](/doc/AnimateOpt)
*   [AnimateCompOpt](/doc/AnimateCompOpt)
*   [BaseValues](/doc/BaseValues)
*   [AnimateComp](/doc/AnimateComp)
*   [AnimationChannelKeys](/doc/AnimationChannelKeys)
*   [AnimationOptions](/doc/AnimationOptions)
*   [AnimationChannel](/doc/AnimationChannel)
*   [FakeMouseComp](/doc/FakeMouseComp)
*   [FakeMouseOpt](/doc/FakeMouseOpt)
*   [SurfaceEffectorCompOpt](/doc/SurfaceEffectorCompOpt)
*   [SurfaceEffectorComp](/doc/SurfaceEffectorComp)
*   [AreaEffectorCompOpt](/doc/AreaEffectorCompOpt)
*   [AreaEffectorComp](/doc/AreaEffectorComp)
*   [ForceMode](/doc/ForceMode)
*   [PointEffectorCompOpt](/doc/PointEffectorCompOpt)
*   [PointEffectorComp](/doc/PointEffectorComp)
*   [ConstantForceCompOpt](/doc/ConstantForceCompOpt)
*   [ConstantForceComp](/doc/ConstantForceComp)
*   [PlatformEffectorCompOpt](/doc/PlatformEffectorCompOpt)
*   [PlatformEffectorComp](/doc/PlatformEffectorComp)
*   [BuoyancyEffectorCompOpt](/doc/BuoyancyEffectorCompOpt)
*   [BuoyancyEffectorComp](/doc/BuoyancyEffectorComp)
*   [Vec3](/doc/Vec3)
*   [DrawSpriteOpt](/doc/DrawSpriteOpt)
*   [DrawTriangleOpt](/doc/DrawTriangleOpt)
*   [ShaderData](/doc/ShaderData)
*   [AppGfxCtx](/doc/AppGfxCtx)
*   [TexPacker](/doc/TexPacker)
*   [SoundData](/doc/SoundData)
*   [SpriteAnim](/doc/SpriteAnim)
*   [SpriteAnims](/doc/SpriteAnims)
*   [LoadSpriteOpt](/doc/LoadSpriteOpt)
*   [NineSlice](/doc/NineSlice)
*   [LoadSpriteSrc](/doc/LoadSpriteSrc)
*   [SpriteData](/doc/SpriteData)
*   [Asset](/doc/Asset)
*   [AssetBucket](/doc/AssetBucket)
*   [AssetsCtx](/doc/AssetsCtx)
*   [AsepriteData](/doc/AsepriteData)
*   [PeditFile](/doc/PeditFile)
*   [SpriteAtlasData](/doc/SpriteAtlasData)
*   [SpriteAtlasEntry](/doc/SpriteAtlasEntry)
*   [AudioCtx](/doc/AudioCtx)
*   [AudioPlayOpt](/doc/AudioPlayOpt)
*   [AudioPlay](/doc/AudioPlay)
*   [GameObjEvents](/doc/GameObjEvents)
*   [GameObjEventNames](/doc/GameObjEventNames)
*   [AppEventMap](/doc/AppEventMap)
*   [TupleWithoutFirst](/doc/TupleWithoutFirst)
*   [SceneName](/doc/SceneName)
*   [SceneDef](/doc/SceneDef)
*   [Game](/doc/Game)
*   [KeepFlags](/doc/KeepFlags)
*   [SetParentOpt](/doc/SetParentOpt)
*   [System](/doc/System)
*   [LCEvents](/doc/LCEvents)
*   [KAPLAYInternal](/doc/KAPLAYInternal)
*   [\_k](/doc/ctx/_k)
*   [addKaboom](/doc/ctx/addKaboom)
*   [Tag](/doc/Tag)
*   [UnionToIntersection](/doc/UnionToIntersection)
*   [Defined](/doc/Defined)
*   [Expand](/doc/Expand)
*   [MergeObj](/doc/MergeObj)
*   [MergePlugins](/doc/MergePlugins)
*   [PluginList](/doc/PluginList)
*   [GamepadDef](/doc/GamepadDef)
*   [KGamepad](/doc/KGamepad)
*   [GameObjInspect](/doc/GameObjInspect)
*   [SpriteAnimPlayOpt](/doc/SpriteAnimPlayOpt)
*   [MusicData](/doc/MusicData)
*   [LoadFontOpt](/doc/LoadFontOpt)
*   [TextureOpt](/doc/TextureOpt)
*   [ImageSource](/doc/ImageSource)
*   [Canvas](/doc/Canvas)
*   [Vertex](/doc/Vertex)
*   [TexFilter](/doc/TexFilter)
*   [TexWrap](/doc/TexWrap)
*   [RenderProps](/doc/RenderProps)
*   [DrawTextureOpt](/doc/DrawTextureOpt)
*   [DrawUVQuadOpt](/doc/DrawUVQuadOpt)
*   [DrawEllipseOpt](/doc/DrawEllipseOpt)
*   [DrawPolygonOpt](/doc/DrawPolygonOpt)
*   [Outline](/doc/Outline)
*   [Mask](/doc/Mask)
*   [SpriteCurAnim](/doc/SpriteCurAnim)
*   [ButtonState](/doc/ButtonState)
*   [GamepadState](/doc/GamepadState)
*   [FPSCounter](/doc/FPSCounter)
*   [App](/doc/App)
*   [initAppGfx](/doc/initAppGfx)
*   [initAssets](/doc/initAssets)
*   [initAudio](/doc/initAudio)
*   [initGame](/doc/initGame)
*   [initApp](/doc/initApp)

Draw

*   [DrawTextOpt](/doc/DrawTextOpt)
*   [TextAlign](/doc/TextAlign)
*   [drawSprite](/doc/ctx/drawSprite)
*   [drawText](/doc/ctx/drawText)
*   [drawRect](/doc/ctx/drawRect)
*   [drawLine](/doc/ctx/drawLine)
*   [drawLines](/doc/ctx/drawLines)
*   [drawCurve](/doc/ctx/drawCurve)
*   [drawBezier](/doc/ctx/drawBezier)
*   [drawTriangle](/doc/ctx/drawTriangle)
*   [drawCircle](/doc/ctx/drawCircle)
*   [drawEllipse](/doc/ctx/drawEllipse)
*   [drawPolygon](/doc/ctx/drawPolygon)
*   [drawUVQuad](/doc/ctx/drawUVQuad)
*   [drawFormattedText](/doc/ctx/drawFormattedText)
*   [drawMasked](/doc/ctx/drawMasked)
*   [drawSubtracted](/doc/ctx/drawSubtracted)
*   [pushTransform](/doc/ctx/pushTransform)
*   [popTransform](/doc/ctx/popTransform)
*   [pushTranslate](/doc/ctx/pushTranslate)
*   [pushScale](/doc/ctx/pushScale)
*   [pushRotate](/doc/ctx/pushRotate)
*   [pushMatrix](/doc/ctx/pushMatrix)
*   [usePostEffect](/doc/ctx/usePostEffect)
*   [formatText](/doc/ctx/formatText)
*   [makeCanvas](/doc/ctx/makeCanvas)
*   [Cursor](/doc/Cursor)
*   [Anchor](/doc/Anchor)
*   [Shape](/doc/Shape)

Options

*   [CharTransform](/doc/CharTransform)
*   [BoomOpt](/doc/BoomOpt)
*   [LevelOpt](/doc/LevelOpt)
*   [GetOpt](/doc/GetOpt)
*   [QueryOpt](/doc/QueryOpt)
*   [PathFindOpt](/doc/PathFindOpt)

GFX

*   [FrameBuffer](/doc/FrameBuffer)
*   [Shader](/doc/Shader)

Layer

*   [layer](/doc/ctx/layer)

Physics

*   [onCollideEnd](/doc/ctx/onCollideEnd)
*   [setGravity](/doc/ctx/setGravity)
*   [getGravity](/doc/ctx/getGravity)
*   [setGravityDirection](/doc/ctx/setGravityDirection)
*   [getGravityDirection](/doc/ctx/getGravityDirection)

Camera

*   [setCamPos](/doc/ctx/setCamPos)
*   [getCamPos](/doc/ctx/getCamPos)
*   [setCamScale](/doc/ctx/setCamScale)
*   [getCamScale](/doc/ctx/getCamScale)
*   [setCamRot](/doc/ctx/setCamRot)
*   [getCamRot](/doc/ctx/getCamRot)
*   [getCamTransform](/doc/ctx/getCamTransform)
*   [shake](/doc/ctx/shake)
*   [flash](/doc/ctx/flash)
*   [camPos](/doc/ctx/camPos)
*   [camScale](/doc/ctx/camScale)
*   [camRot](/doc/ctx/camRot)
*   [camFlash](/doc/ctx/camFlash)
*   [camTransform](/doc/ctx/camTransform)
*   [toScreen](/doc/ctx/toScreen)
*   [toWorld](/doc/ctx/toWorld)

Audio

*   [play](/doc/ctx/play)
*   [burp](/doc/ctx/burp)
*   [setVolume](/doc/ctx/setVolume)
*   [getVolume](/doc/ctx/getVolume)
*   [volume](/doc/ctx/volume)
*   [audioCtx](/doc/ctx/audioCtx)

Random

*   [rand](/doc/ctx/rand)
*   [randi](/doc/ctx/randi)
*   [randSeed](/doc/ctx/randSeed)
*   [choose](/doc/ctx/choose)
*   [chooseMultiple](/doc/ctx/chooseMultiple)
*   [shuffle](/doc/ctx/shuffle)

Layers

*   [setLayers](/doc/ctx/setLayers)
*   [getLayers](/doc/ctx/getLayers)
*   [getDefaultLayer](/doc/ctx/getDefaultLayer)

Level

*   [addLevel](/doc/ctx/addLevel)

Data

*   [getData](/doc/ctx/getData)
*   [setData](/doc/ctx/setData)
*   [screenshot](/doc/ctx/screenshot)
*   [download](/doc/ctx/download)
*   [downloadText](/doc/ctx/downloadText)
*   [downloadJSON](/doc/ctx/downloadJSON)
*   [downloadBlob](/doc/ctx/downloadBlob)
*   [record](/doc/ctx/record)
*   [Recording](/doc/Recording)

Debug

*   [debug](/doc/ctx/debug)
*   [Debug](/doc/Debug)

Plugins

*   [plug](/doc/ctx/plug)
*   [system](/doc/ctx/system)
*   [KAPLAYPlugin](/doc/KAPLAYPlugin)

Constants

*   [ASCII\_CHARS](/doc/ctx/ASCII_CHARS)
*   [LEFT](/doc/ctx/LEFT)
*   [RIGHT](/doc/ctx/RIGHT)
*   [UP](/doc/ctx/UP)
*   [DOWN](/doc/ctx/DOWN)
*   [RED](/doc/ctx/RED)
*   [GREEN](/doc/ctx/GREEN)
*   [BLUE](/doc/ctx/BLUE)
*   [YELLOW](/doc/ctx/YELLOW)
*   [MAGENTA](/doc/ctx/MAGENTA)
*   [CYAN](/doc/ctx/CYAN)
*   [WHITE](/doc/ctx/WHITE)
*   [BLACK](/doc/ctx/BLACK)

Button Bindings

*   [ButtonBinding](/doc/ButtonBinding)
*   [ButtonsDef](/doc/ButtonsDef)
*   [ButtonBindingDevice](/doc/ButtonBindingDevice)

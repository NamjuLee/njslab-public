## HTML Canvas Optimization of Rendering Loop with JSAPI for Drawing on Map, 2019

Dec 17, 2019

[link](https://medium.com/analytics-vidhya/html-canvas-optimization-of-rendering-loop-with-jsapi-for-drawing-on-map-71cb0500a213)


Are you interested in developing a tool to draw shapes or visualize data on a map? You may wonder how to optimize your custom renderer with JSAPI of ArcGIS; then this article is yours.

Why HTML canvas?

There are no particular reasons that HTML Canvas is the best way to draw on a Web browser, compared to WebGL or SVG, which could also be considered tools for drawing. However, it provides straightforward ways of dynamic drawing on the Web environment. Canvas is known as one of the simple and interactive ways of drawing or visualizing on the Web browser.

Why JSAPI for Mapping and Visualizing data

JSAPI, a mapping product of ESRI, provides us with lots of powerful API that enable us to analyze, visualize, and draw on a map. HTML Canvas with projections from JSAPI, we could build a custom drawing tool on top of a map. With the Map and MapView objects from the JSAPI, we could create a dynamic drawing tool based on the coordinate systems of geographical and screen positions.

In this article, although there are many aspects of using HTML Canvas with JSAPI(later I will introduce more fun and exciting stuff), this article focuses on sharing several ways of optimizing of usage of HTML Canvas in real-time graphics with JSAPI(MapView object).

Let's remember the conventional and well-known optimization techniques of HTML Canvas we could adopt to minimize the computations and drawings in the rendering loop.

Reduce rendering loop
avoid using Shadow such as context.shadowBlur.
Avoid using the API: context.save() and context.restore()
use multiple canvases for different situations: static or animated scenes.
use requestAnimationFrame, rather than setTimeout or setInterval
more and more…
Although 'requestAnimationFrame' has lots of optimizations of rendering loops, there are some spaces where we can optimize the computation explicitly.

Controlling the rendering loop

There are more beyond the above I mentioned, but we do not want to do rendering loops when no interaction is coming. For example, when the mouse leaves the div or HTML Canvas context, or after it renders specific loops for finished animations, we could stop the loop without clearing the canvas. Thus, we still see the shapes or visualizations on the map.

Even further optimization, a frame rate could be controlled. For instance, when zooming or panning the map, the rendering loop's low frame rate shows jagged animations that cannot stick to the map very well. Obviously, this is not good for real-time graphics. In this case, we could dynamically switch the frame rate of the rendering loop based on the pan or zoom event from MapView object.

Differentiate tasks

In most real-time graphics environments, such as Unity, Unreal, and so on, there are three distinctive steps: the steps of (1)initialization, (2)updating, and (3)rendering phase in a single loop. Taking advantage of each step becomes a significant role in optimizing the computation and loop. It is not desired to compute the same data in each rendering loop. In this case, we put this computation in the initialization stage. Therefore, in terms of developing the pipeline in the architecture, we need to design the group of data carefully flows to control when necessary.

In the update phase, we could compute meaningful calculations such as checking distances, physics for dynamics, hovering effects, and so on. In case the frame rate decreases, we could skip a certain number of the frame to compute because it has nothing to do with the rendering in which it draws actual shapes on the screen we can see. Some functions can be executed 15 or 10 times per second.

Let's visit the rendering steps; we could regulate the frame rate freely based on the capability of the computer system since the update stages have nothing to do with the rendering. From a Powerful machine to mobile, I highly recommend installing a sort of observer to monitor and shift the frame rates in rendering loops. We could apply different frame rates based on the number of shapes or visualization entities or depending on the event, such as panning or zooming. In addition, thanks to the parallel processing of GPU, drawing-specific operations are operated in the rendering stage. I mean, the separating and isolating of concerns or tasks could always be considered good practices for debugging and optimization within a certain complexity of architecture.

Picking shapes

Selection is an essential and expansive operation for graphics. Even though picking is a fundamentally different story in general, it also affects the rendering loop. Think about the situation: whenever you move your mouse, click, or drag something, we need to track and calculate the pipeline events while rendering the loop. On top of the current rendering loop, we do not want to add additional computations for the event in the loop. But unfortunately, there is no way to avoid the executions. Otherwise, nothing happens.

To minimize the computation for picking, there are many ways of achieving the picking by such algorithms as Quadtree, offscreen rendering, or simple math like distance checking. But again, we need to minimize the loop itself, which is a fundamental help to maintain the looping condition.

Mouse Press, Down, click, double click events happen as a one-time operation in rendering loops. In this case, there is no way to skip the execution while looping. However, we could optimize the loop by skipping specific frames against moving or dragging from the mouse event. For instance, while moving your mouse, it is necessary to check whether the pointer is hovering over a shape or not. We do not need to execute this expansive operation 60 times a sec or every frame.

An even more complex instance is that, while dragging a vertex of a polygon on a map, we could check the closest vertex of shapes to snap the selected vertex to the closest one. In this operation, we could compute the checking operation not in the individual loop, but in every even frame of the loop, or every five frames of the loop. Then, we capture the closest vertex of shape, and we reuse the captured one when the mouse is released. Now you can see how many frames we could reduce to compute the operations.

Processing events in rendering loops

There are many pipelines and inputs to trigger executing computation during the Rendering loop, like Keyboard or UI buttons or slider stuff. Firing these functions continuously affects performance. As a safeguard, we could install functions to listen to the events and smartly interpolate or skip some of them if the same event keeps coming quickly and continuously based on the status of the scene and MapView.


There would be many tricks for optimization at the level of nano, micro, and macroscope throughout the architecture. In this article, I share the technics for reducing the number of rendering loops in a sec with MapView From JSAPI. For example, I suggest visiting Storymap (https://storymaps.arcgis.com) and encouraging you to experience Expressmap, which I applied above, and more.
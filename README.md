# preact_ie7

Yes.  Someone I know needs IE7 in 2019 and wants React.  (dramatic lightning; thunder)

![image](https://user-images.githubusercontent.com/77482/52459368-7f370600-2b19-11e9-8da7-4681e0ec8c65.png)




<br/><br/>

## Come on.  No.

Yeah.

So the gag is, my buddy had to do some dev, wanted React, but needed to be able to target MS Office.

Sure, it's 2019.  Sure, IE is cancelled.  Sure, Edge is Chrome now.

But Office still embeds MSHTML7.2, which is IE7.

And his stuff needed to work inside of Office.

... sooooooo.



<br/><br/>

## Okay so why preact

Because have you ever shimmed React?  It punched me in the eye 😢

I tried.  Rly I did.  For minutes.  But also I knew it was utterly doomed, and I was just making sure things hadn't changed.  Rolling back React to IE7 even with shims is, like, 0.6 or 0.7 I think?  And let's be honest, we're not getting back out of the `babel` era.  Nah.

Then I tried [inferno](https://infernojs.org/), because it's hipster bullcrap and so am I, which
means I love it.  However, I couldn't get past certain IE8 topics, so IE7 was out of reach.

Then I tried [preact](https://preactjs.com/), but I actually couldn't make it work either.

So I tried `next` and `nuxt` and `nerv`.  I thought about trying `vue` but I didn't want to have to beat myself up afterwards, so, that was out.  I tried `HTM`, `zeit`, `hyperscript`, `mithril`, and then I got angry at myself for even knowing the name `glimmer`.

`viper`, `stencil`, `dojo 2`, `mobx`, `quasar`, `cxjs`, `riot`, and `deku` were right up front that this wasn't an option.

`cyclejs`, `elm`, `amber`, `angular`, `canjs`, `wijmo`, `w2ui`, `angulardart`, `compost`, `marko widgets`, `spree`, `apprun`, `jsblocks`, `blocks.js`, `blok`, `knockout`, `ractive`, `aurelia`, `sencha ext.js`, and `w3 components` were not considered, as too different.



<br/><br/>

## Is that literally every library on NPM?

no, there's still d3

But anyway after all those went poof I had a sad, and I did what every programmer does.

I decided to point my finger at a library, yell "that one" really loudly at my laptop, then I went to chat and I whined at the author.  Turns out he's super generous with his time, and
he helped get this banged out in a couple hours.



<br/><br/>

## You're lying.  The internet doesn't help

I know, right?

But this repo, combined with a look at my general incompetence, is proof.



<br/><br/>

## Enough schtick.  What is this?

This is `preact` bent just-so to work under IE7.

It's probably rickety.

This is a `babel 6` (not 7, old shims) stack run through `rollup`, which has a bunch of shims in place that make things ***Work*** &trade;.

Problematically, two things have to be extraneously shimmed, and they have to be before anything else.  Sooooo, there's a block of code you actually have to *copy paste*, like a troglodyte.  (It's [index.js lines 2-55](https://github.com/StoneCypher/preact_ie7/blob/732975097cf26545ce8acde458a6932736456014/src/js/index.js#L2-L55) at the time of this writing.)



<br/><br/>

## But why

![](https://media.giphy.com/media/1M9fmo1WAFVK0/giphy.gif)

Well

In addition to the shims, we need to do one horrible thing and one ***really*** horrible thing

This is such a bad idea 😅

The horrible thing is we shim out `addEventListener` and `removeEventListener` by checking for their absence on `window` then assuming that means it's old-IE and putting in some `attachEvent` half-bakery.  This is horrible because `attachEvent` can't do some of the stuff `aEL` and `rEL` do, and other things are going to think that's real.

The ***really*** horrible thing we do?

Uuuuuh.  The only thing we couldn't shim in IE7 was that `preact` wants to set a property on `TextNode`s as a boolean, and IE7 isn't okay with that.

Couldn't find an alternative.

So ... 😅😅😅 we incorrectly shimmed `document.createTextNode` 😅😅😅

the worst anything ever.  really.  what happens when anything else uses it?

in prod, this could be scoped within an iframe, but, like.  g'lawd

So what it actually does is return a tag node *instead of* a text node.  Which is ***super*** wrong and not-compliant.

But also the tag node, which has an illegal name `x-text` that shouldn't collide, also has the things `preact` needs.

So that gets it to render.  (Somewhat slowly, because `preact`'s VDOM always thinks it's changed. But, for simple stuff, this should be enough.)



<br/><br/>

# Et voilà

(but really this is a bad idea and only to be used under duress)

Many thanks to @developit from [preact team](https://github.com/developit/preact) for helping me commit this sacrilege.

Try it (on IE7, lol) [here](https://stonecypher.github.io/preact_ie7/index.html).

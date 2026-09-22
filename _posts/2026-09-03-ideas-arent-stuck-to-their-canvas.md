---
title: "Ideas Aren't Stuck to Their Canvas"
subtitle: "Why I moved my writing — papers, my thesis, even my résumé — out of Google Docs and into a repo."
date: 2026-09-03
section: scientist
skin: default
type: essay
---

I figured something out this afternoon, and it started with my résumé.

Every résumé and CV I've ever made lived in Google Docs. And every time I wanted to work on one with AI, I hit the same small wall: download it, upload it, get back *another* copy, then babysit that copy. Multiply that by a dozen versions and you get why I dreaded touching them. So I'd stay up all night making one perfect Google Doc — and then I was **stuck with it**. That single artifact became the thing. The look of it, the template, the font — all of it hardened around the words the moment I stopped editing.

That's the trap I want to talk about. Not Google Docs specifically. The bigger thing underneath it.

## We think ideas live on canvases

Most of the tools we're sold come pre-decided about *where* a kind of thinking is allowed to happen. Writing goes in Microsoft Word. Documents go in Google Docs. Code goes in this environment, slides go in that one, drawings go over here. Each one is a proprietary canvas with its own file format and its own UI, and after enough years you internalize the boundaries. You start to believe that to *write* — to really sit down and want to do it — you need to be inside a Word doc. That an idea isn't real until it's on the right surface.

But the surface was never the idea.

## Everything is really just a stream of text

Here's the reframe that unlocked it for me. Almost all of our spoken word, our written word, our ideas — they're streams of consciousness that, in most cases, we express as text. Even the visual stuff. When something is vivid in your head, how do you get it to another person? You **describe it in text**. When you see or experience something in the world, you translate it into text to hand it off. We literally teach babies the world with text labels stuck onto everything, even though the baby is experiencing that world through every other sense at once.

Text is the shared substrate. It's the lowest-common-denominator carrier for thoughts that actually live in a much higher-dimensional space. Once I saw my writing that way — as a stream I *happen* to be expressing in text right now — the specific canvas stopped feeling sacred. It's just the current container.

## So I started writing in a repo

If the words are the thing and the canvas is just a container, then put the words somewhere neutral and let the container be a *choice you make later*. For me that's a git repo. Plain text, version-controlled, tool-agnostic.

I've been doing this for a while now without fully naming it — my papers, my thesis, the figures for other projects. And the part I keep trying to get colleagues and teams to see is this: **you can do all of it in a coding repo or on the command line**, and then publish. The same source can come out feeling like a PDF. Or a `.docx`. Or I take the *same content*, prompt a little differently, and ask: how would this look as HTML? Now it's slides. Or PDF slides. Or a report. Or — strip all the text out and replace it with a single visual — what would that visual even be, and would it carry everything the words were carrying?

One source. Many presentations. You stop rewriting the idea every time you need it in a new shape.

## Theme is an afterthought

This is the part I most want people to believe: **you can choose your theme later.**

Pick one now if you want, then republish with different colors, fonts, and styling whenever. That should not be a manual, select-all, detail-by-detail slog — which is exactly what it *is* in a Google Doc, and exactly why we get so stuck on formats and how things look. Because I've done that slog by hand for years, I know precisely where AI and a coding-forward setup save the time.

Concrete example from today: I rebuilt my résumé so that **one source file publishes two ways** — a clean version for submitting, and a color-highlighted version for reviewing my own edits — from a single build flag. Same words. No select-all. No re-styling. Two commands, two themes, zero divergence between them. That's the whole idea in miniature.

## Design is really about audience

Once the words are free of their canvas, "design" turns out to be a different question than I thought. It's not decoration. It's **translation for a specific reader.**

Strip a piece down to its essentials and ask the honest questions: What information am I actually trying to convey? Does this text express what I really think? Does it align with my model of the world, and with what I want the reader to take away? (There's a guy I heard about who wanted to build a whole *world of text* around his life — paring everything down to only the most essential parts. That image stuck with me.) Then the harder question: when someone reads this, are they understanding the *same English* I meant? Or just some English?

And only *then* the design question: how do I put it in the best light for *this* audience? Scientists need detail I can cut for business folks. Devs want a different shape than either. Even team-to-team, person-to-person, the same understanding has to be re-translated depending on who's across from you — whether you're talking to a colleague or to your mom, and whether or not your mom happens to have a PhD in that field. It's the same idea every time. It just wears different clothes.

## Don't delete — comment it out

Here's the quiet superpower of doing this coding-forward: **generated information doesn't have to be wasted.**

In a Google Doc, when you rewrite a paragraph, the old one is gone. In a repo, you just comment it out. When you publish a particular version, a script pulls the sections that version needs — and everything else is still sitting right there. Rewrote a whole chunk but want to keep three variants of it? Keep all three. Hold onto the density; publish only what a given format wants. You never lose what your ideas *were*, only choose which ones show up this time.

And then there's the commit history. It's not just backup — it's **provenance for your thinking.** Where did this idea come from? How did it evolve? Which parts did I write, and where did AI actually help versus where it just added words? The history answers that. You can watch your own thoughts move over time, which is a strange and useful thing to be able to do.

## The point

I'm not really trying to convince anyone to abandon their favorite editor. I'm saying: notice when the canvas is doing your thinking for you. Your ideas are a stream. Text is just the container you're pouring it into right now — and you can always pour it into a different one tomorrow, keep every draft you made along the way, and remember exactly how you got here.

Turns out I just needed to get my résumé out of Google Docs to see it.

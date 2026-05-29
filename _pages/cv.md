---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* Zhejiang University

Research interests
======
* Multimodal agents and long-horizon decision making
* Game agents and open-world interaction
* Efficient reasoning, memory, and agent control
* Vision-language models for interactive environments

Selected publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Projects
======
* [SPIKE: An Adaptive Dual Controller Framework for Cost-Efficient Long-Horizon Game Agents](/projects/SPIKE/)
* IAMFlow: Advancing Narrative Long Video Generation via Training-Free Identity-Aware Memory

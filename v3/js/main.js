(function(){var reviewNames=['В. Иваницкая','Анастасия Е.','Дарья Ш.','Настя Ч.','Иосиф','Анастасия','Валерия Л.','Сергей Б.','Ольга Ш.','Александр К.','Мария М.','Вероника Д.','Танюшка А.','Яна Ф.','Ксеша','Владимир Х.','Lina B.'];var group=document.querySelector('[data-reviews-group]');if(!group)return;group.querySelectorAll('.review-card h3').forEach(function(heading,index){heading.textContent=reviewNames[index]||heading.textContent});var track=document.querySelector('[data-reviews-track]');if(!track||track.dataset.reviewsCloned)return;var clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');track.appendChild(clone);track.dataset.reviewsCloned='true'})();
(function(){var dialog=document.getElementById('price-pdf-modal');if(!dialog)return;var opener=null;function close(){dialog.classList.remove('open');if(opener)opener.focus()}document.querySelectorAll('[data-price-pdf-open]').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();opener=button;dialog.classList.add('open');dialog.querySelector('[data-price-pdf-close]').focus()})});document.querySelectorAll('[data-price-pdf-close]').forEach(function(button){button.addEventListener('click',function(event){event.preventDefault();close()})});dialog.addEventListener('click',function(event){if(event.target===dialog)close()});document.addEventListener('keydown',function(event){if(event.key==='Escape'&&dialog.classList.contains('open'))close()})})();
(function(){var formats=document.querySelector('.setups#formats');var space=document.querySelector('.studio-map#space');if(formats&&space&&space.parentNode){space.parentNode.insertBefore(formats,space)}})();
function bindSignalTabs(tabSelector,panelSelector,dataKey){var tabs=Array.prototype.slice.call(document.querySelectorAll(tabSelector));var panels=Array.prototype.slice.call(document.querySelectorAll(panelSelector));function activate(tab){var panel=document.getElementById(tab.dataset[dataKey]);if(!panel)return;tabs.forEach(function(item){item.setAttribute('aria-selected','false')});panels.forEach(function(item){item.classList.remove('active','panel-enter')});tab.setAttribute('aria-selected','true');panel.classList.add('active');void panel.offsetWidth;panel.classList.add('panel-enter');tab.dispatchEvent(new CustomEvent('signal-tabs:change',{bubbles:true,detail:{index:tabs.indexOf(tab),total:tabs.length}}))}tabs.forEach(function(tab,index){tab.addEventListener('click',function(){activate(tab)});tab.addEventListener('keydown',function(event){var key=event.key;if(!['ArrowRight','ArrowLeft','Home','End'].includes(key))return;event.preventDefault();var next=key==='Home'?0:key==='End'?tabs.length-1:(index+(key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();activate(tabs[next])})})}bindSignalTabs('.tab','.setup-panel','setup');bindSignalTabs('.equipment-tab','.equipment-panel','equipment');
(function(){
  var setups=document.querySelector('.setups#formats');
  if(!setups)return;
  var tabs=Array.prototype.slice.call(setups.querySelectorAll('.tab'));
  var panels=Array.prototype.slice.call(setups.querySelectorAll('.setup-panel'));
  var slider=setups.querySelector('[data-setup-slider]');
  var previous=setups.querySelector('[data-setup-prev]');
  var next=setups.querySelector('[data-setup-next]');
  var current=setups.querySelector('[data-setup-current]');
  var total=setups.querySelector('[data-setup-total]');
  var startX=null;
  if(!tabs.length||!slider)return;
  tabs.forEach(function(tab,index){
    var panel=document.getElementById(tab.dataset.setup);
    tab.id=tab.id||'setup-tab-'+index;
    tab.setAttribute('aria-controls',tab.dataset.setup);
    if(panel){panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id)}
  });
  function activeIndex(){return Math.max(0,tabs.findIndex(function(tab){return tab.getAttribute('aria-selected')==='true'}))}
  function sync(index){var selectedIndex=typeof index==='number'?index:activeIndex();if(current)current.textContent=String(selectedIndex+1).padStart(2,'0');if(total)total.textContent=String(tabs.length).padStart(2,'0')}
  function move(direction){tabs[(activeIndex()+direction+tabs.length)%tabs.length].click()}
  setups.addEventListener('signal-tabs:change',function(event){sync(event.detail&&event.detail.index)});
  if(previous)previous.addEventListener('click',function(){move(-1)});
  if(next)next.addEventListener('click',function(){move(1)});
  slider.addEventListener('pointerdown',function(event){startX=event.clientX});
  slider.addEventListener('pointerup',function(event){if(startX===null)return;var delta=event.clientX-startX;startX=null;if(Math.abs(delta)<48)return;move(delta<0?1:-1)});
  slider.addEventListener('pointercancel',function(){startX=null});
  sync();
})();
(function(){
  var dialog=document.getElementById('gallery-lightbox');
  var image=document.getElementById('gallery-lightbox-image');
  var caption=document.getElementById('gallery-lightbox-title');
  var items=Array.prototype.slice.call(document.querySelectorAll('[data-gallery-open]'));
  var opener=null;
  var currentIndex=0;
  var startX=null;
  if(!dialog||!image||!caption||!items.length)return;
  function show(index){
    currentIndex=(index+items.length)%items.length;
    var button=items[currentIndex];
    var photo=button.querySelector('img');
    if(!photo)return;
    image.src=photo.currentSrc||photo.src;
    image.alt=photo.alt;
    caption.textContent=button.dataset.galleryCaption||photo.alt;
  }
  function close(){
    dialog.hidden=true;
    document.body.classList.remove('lightbox-open');
    if(opener)opener.focus();
  }
  items.forEach(function(button,index){
    button.addEventListener('click',function(){
      opener=button;
      show(index);
      dialog.hidden=false;
      document.body.classList.add('lightbox-open');
      dialog.querySelector('.gallery-lightbox-close').focus();
    });
  });
  dialog.querySelectorAll('[data-gallery-close]').forEach(function(button){button.addEventListener('click',close)});
  dialog.querySelector('[data-gallery-prev]').addEventListener('click',function(){show(currentIndex-1)});
  dialog.querySelector('[data-gallery-next]').addEventListener('click',function(){show(currentIndex+1)});
  dialog.addEventListener('pointerdown',function(event){startX=event.clientX});
  dialog.addEventListener('pointerup',function(event){
    if(startX===null)return;
    var delta=event.clientX-startX;
    startX=null;
    if(Math.abs(delta)<48)return;
    show(currentIndex+(delta<0?1:-1));
  });
  dialog.addEventListener('pointercancel',function(){startX=null});
  document.addEventListener('keydown',function(event){
    if(dialog.hidden)return;
    if(event.key==='Escape')close();
    if(event.key==='ArrowLeft')show(currentIndex-1);
    if(event.key==='ArrowRight')show(currentIndex+1);
  });
})();
    (function(){var reduce=window.matchMedia('(prefers-reduced-motion: reduce)');var headingSelector='#formats h2,.equipment-head h2,.portfolio .section-head h2,.pricing .section-head h2,.included .section-head h2,.process .section-head h2,.contact-title';var headings=Array.prototype.slice.call(document.querySelectorAll(headingSelector));if(!reduce.matches&&'IntersectionObserver' in window&&headings.length){document.documentElement.classList.add('js-motion');var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-in-view');observer.unobserve(entry.target)}})},{threshold:.18});headings.forEach(function(heading){heading.classList.add('motion-heading');observer.observe(heading)})}var navLinks=Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));var sections=navLinks.map(function(link){return document.querySelector(link.getAttribute('href'))}).filter(Boolean);if('IntersectionObserver' in window&&sections.length){var navObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){navLinks.forEach(function(link){link.classList.toggle('nav-current',link.getAttribute('href')==='#'+entry.target.id)})}})},{rootMargin:'-24% 0px -66% 0px',threshold:0});sections.forEach(function(section){navObserver.observe(section)})}}());
    document.querySelectorAll('.faq-q').forEach(function(question){question.addEventListener('click',function(){question.closest('.faq-item').classList.toggle('open')})});
    document.getElementById('booking-form').addEventListener('submit',function(event){event.preventDefault();window.location.assign('https://t.me/prufcastadmin')});
  


    (function () {
      var studio = document.getElementById('studio');
      if (studio && !document.querySelector('.studio-map')) {
        studio.insertAdjacentHTML('afterend', `<section class="studio-map" id="space">
<div class="wrap">
<div class="studio-map-head">
<div>
<div class="eyebrow">ПРОСТРАНСТВО</div>
<h2>В студии можно<br>не только записывать</h2>
</div>
<p class="lead">Нажмите на плюс, чтобы посмотреть, как устроен каждый угол студии.</p>
</div>
<div class="studio-explore" aria-label="Интерактивная схема студии">
<span class="studio-label a">КОМНАТА<br>ДЛЯ ИНТЕРВЬЮ</span>
<span class="studio-label b">КУХНЯ<br>С КОФЕ</span>
<button class="studio-hotspot room-eight" type="button" data-space="room-eight" aria-label="Открыть дополнительную комнату">+</button>
<button class="studio-hotspot hall-room" type="button" data-space="hall" aria-label="Открыть холл и зону ожидания">+</button>
<button class="studio-hotspot rest-room" type="button" data-space="rest" aria-label="Открыть комнату отдыха">+</button>
<button class="studio-hotspot producers-room" type="button" data-space="producers" aria-label="Открыть продюсерскую">+</button>
<button class="studio-hotspot small-studio" type="button" data-space="small" aria-label="Открыть малую студию">+</button>
<button class="studio-hotspot coffee-room" type="button" data-space="coffee" aria-label="Открыть кухню с кофе">+</button>
<button class="studio-hotspot makeup-room" type="button" data-space="makeup" aria-label="Открыть гримёрку">+</button>
<button class="studio-hotspot reception-room" type="button" data-space="reception" aria-label="Открыть приёмную">+</button>
<button class="studio-hotspot main-room" type="button" data-space="main" aria-label="Открыть главную студию">+</button>
</div>
</div>
</section>
<div class="studio-modal" id="studio-modal" role="dialog" aria-modal="true" aria-labelledby="studio-modal-title">
<div class="studio-dialog">
<button class="studio-close" type="button" aria-label="Закрыть">×</button>
<div class="studio-dialog-photo" id="studio-modal-photo">
</div>
<div class="studio-dialog-copy">
<div class="eyebrow">ПРОСТРАНСТВО СТУДИИ</div>
<h3 id="studio-modal-title">
</h3>
<p id="studio-modal-copy">
</p>
<div class="studio-dialog-note" id="studio-modal-note">
</div>
</div>
</div>
</div>`);
      }
      document.querySelectorAll('.setup-photo').forEach(function (photo) {
        if (!photo.querySelector('.live-label')) photo.insertAdjacentHTML('afterbegin', '<span class="live-label" style="position:absolute;z-index:2;left:20px;top:20px;padding:8px 10px;background:rgba(17,17,15,.72)">CAM 01&nbsp; LIVE</span>');
      });
      var spaces = {
        main: { title: 'Главная студия', copy: 'Большая съёмочная площадка для подкастов, интервью и видеошоу. Здесь собраны выразительный свет, большой стол, камеры и отдельная запись каждого голоса.', note: 'До 4 гостей · несколько камер · оператор на площадке', image: 'assets/images/studio-main-set-cameras.webp' },
        small: { title: 'Малая студия', copy: 'Камерный сетап с круглым столом для интервью на двух человек, экспертных разговоров и спокойных аудиовизуальных выпусков.', note: '2 спикера · круглый стол · отдельные дорожки', image: 'assets/images/studio-small-room-table.webp' },
        coffee: { title: 'Кухня с кофе', copy: 'Отдельная кухня для коротких пауз в съёмочном дне: кофе, вода и всё нужное для команды и гостей — не заходя в кадр студии.', note: 'Кофемашина · вода · короткая пауза', image: 'assets/images/studio-kitchen-coffee.webp' },
        hall: { title: 'Холл и зона ожидания', copy: 'Просторный коридор-холл с диванами. Здесь гости могут спокойно обсудить выпуск, настроиться перед камерой или отдохнуть между дублями.', note: 'Диваны · Wi‑Fi · ожидание для команды', image: 'assets/images/studio-hallway.webp' },
        producers: { title: 'Продюсерская', copy: 'Рабочая зона продюсеров с монитором для подготовки выпусков, контроля материалов и согласования задач со съёмочной командой.', note: 'Рабочее место · монитор · подготовка материалов', image: 'assets/images/studio-producer-room.webp' },
        rest: { title: 'Комната отдыха', copy: 'Тихое помещение рядом с продюсерской, чтобы переключиться между дублями, подготовить гостя или провести короткую встречу без шума площадки.', note: 'Диван · спокойный свет · пауза между съёмками', image: 'assets/images/studio-rest-room.webp' },
        makeup: { title: 'Гримёрка', copy: 'Отдельное помещение с зеркалом и светом для подготовки перед камерой. Можно спокойно привести себя в порядок без спешки и лишнего внимания.', note: 'Зеркало с подсветкой · кресло · личные вещи', image: 'assets/images/studio-makeup-area.webp' },
        reception: { title: 'Приёмная', copy: 'Первая точка маршрута по студии: здесь встречают гостей, помогают с организационными вопросами и направляют команду к нужному сетапу.', note: 'Входная зона · встреча гостей · навигация', image: 'assets/images/studio-reception.webp' },
        'room-eight': { title: 'Дополнительная комната', copy: 'Небольшое тихое помещение, которое можно использовать для личных вещей, подготовки команды или технических задач в день съёмки.', note: 'Спокойная зона · подготовка · хранение', image: 'assets/images/studio-reception.webp' }
      };
      var studioModal = document.getElementById('studio-modal');
      var studioTitle = document.getElementById('studio-modal-title');
      var studioCopy = document.getElementById('studio-modal-copy');
      var studioNote = document.getElementById('studio-modal-note');
      var studioPhoto = document.getElementById('studio-modal-photo');
      function closeStudioModal() { if (studioModal) studioModal.classList.remove('open'); }
      document.querySelectorAll('.studio-hotspot').forEach(function (button) {
        button.addEventListener('click', function () {
          var item = spaces[button.getAttribute('data-space')];
          if (!item || !studioModal) return;
          studioTitle.textContent = item.title;
          studioCopy.textContent = item.copy;
          studioNote.textContent = item.note;
          studioPhoto.style.backgroundImage = "url('" + item.image + "')";
          studioModal.classList.add('open');
        });
      });
      if (studioModal) {
        studioModal.addEventListener('click', function (event) { if (event.target === studioModal || event.target.closest('.studio-close')) closeStudioModal(); });
        document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeStudioModal(); });
      }
      var benefits = document.querySelector('.benefits');
      if ('IntersectionObserver' in window && benefits) {
        benefits.classList.add('reveal-ready');
        var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }); }, { threshold: .2 });
        observer.observe(benefits);
      }
      var studioStory = document.querySelector('[data-studio-story]');
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (studioStory) {
        var storySlides = Array.prototype.slice.call(studioStory.querySelectorAll('[data-studio-slide]'));
        var storyCopies = Array.prototype.slice.call(studioStory.querySelectorAll('[data-studio-copy]'));
        var storyDots = Array.prototype.slice.call(studioStory.querySelectorAll('[data-studio-dot]'));
        var storyCurrent = studioStory.querySelector('[data-studio-current]');
        var storyVisuals = studioStory.querySelector('.studio-story-visuals');
        var storyIndex = 0;
        var isStudioDesktop = window.matchMedia('(min-width: 761px)').matches;
        var canAnimateStudioDesktop = isStudioDesktop && window.gsap && window.ScrollTrigger;
        function setStudioSlide(index) {
          storyIndex = (index + storySlides.length) % storySlides.length;
          storySlides.forEach(function (slide, itemIndex) { slide.classList.toggle('is-active', itemIndex === storyIndex); });
          storyCopies.forEach(function (copy, itemIndex) { copy.classList.toggle('is-active', itemIndex === storyIndex); });
          storyDots.forEach(function (dot, itemIndex) {
            var isActive = itemIndex === storyIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
          });
          if (storyCurrent) storyCurrent.textContent = String(storyIndex + 1).padStart(2, '0');
        }
        if (!reduceMotion.matches) {
          if (!isStudioDesktop || canAnimateStudioDesktop) studioStory.classList.add('studio-story-ready');
          storyDots.forEach(function (dot, dotIndex) {
            dot.addEventListener('click', function () { setStudioSlide(dotIndex); });
            dot.addEventListener('keydown', function (event) {
              if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
              event.preventDefault();
              var nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? storyDots.length - 1 : dotIndex + (event.key === 'ArrowRight' ? 1 : -1);
              setStudioSlide(nextIndex);
              storyDots[storyIndex].focus();
            });
          });
          var storyPrevious = studioStory.querySelector('[data-studio-prev]');
          var storyNext = studioStory.querySelector('[data-studio-next]');
          if (storyPrevious) storyPrevious.addEventListener('click', function () { setStudioSlide(storyIndex - 1); });
          if (storyNext) storyNext.addEventListener('click', function () { setStudioSlide(storyIndex + 1); });
          if (storyVisuals) {
            var swipeStart = null;
            storyVisuals.addEventListener('pointerdown', function (event) { swipeStart = event.clientX; }, { passive: true });
            storyVisuals.addEventListener('pointerup', function (event) {
              if (swipeStart === null) return;
              var swipeDistance = event.clientX - swipeStart;
              swipeStart = null;
              if (Math.abs(swipeDistance) < 42 || !window.matchMedia('(max-width: 760px)').matches) return;
              setStudioSlide(storyIndex + (swipeDistance < 0 ? 1 : -1));
            }, { passive: true });
            storyVisuals.addEventListener('pointercancel', function () { swipeStart = null; }, { passive: true });
          }
        }
        if (!reduceMotion.matches && canAnimateStudioDesktop) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          var storyShowcase = studioStory.querySelector('.studio-story-showcase');
          if (storyShowcase && storySlides.length && storyCopies.length) {
            window.gsap.set(storySlides, { autoAlpha: 0, xPercent: 0, rotateY: 0, transformPerspective: 1600 });
            window.gsap.set(storyCopies, { autoAlpha: 0, xPercent: 0 });
            setStudioSlide(0);
            window.gsap.set(storySlides[0], { autoAlpha: 1 });
            window.gsap.set(storyCopies[0], { autoAlpha: 1 });
            var storyTimeline = window.gsap.timeline({
              scrollTrigger: { trigger: storyShowcase, start: 'top top', end: '+=' + (storySlides.length * 86) + '%', pin: true, scrub: .85, anticipatePin: 1, invalidateOnRefresh: true }
            });
            storyTimeline.to({}, { duration: .45 });
            for (var storyStep = 1; storyStep < storySlides.length; storyStep += 1) {
              (function (step) {
                var previousSlide = storySlides[step - 1];
                var previousCopy = storyCopies[step - 1];
                var nextSlide = storySlides[step];
                var nextCopy = storyCopies[step];
                var entersFromLeft = step % 2 === 0;
                storyTimeline.to(previousSlide, { autoAlpha: 0, xPercent: entersFromLeft ? 18 : -18, rotateY: entersFromLeft ? 18 : -18, duration: .2, ease: 'none' })
                  .to(previousCopy, { autoAlpha: 0, xPercent: entersFromLeft ? 10 : -10, duration: .2, ease: 'none' }, '<')
                  .fromTo(nextSlide, { autoAlpha: 0, xPercent: entersFromLeft ? -42 : 42, rotateY: entersFromLeft ? -68 : 68, transformOrigin: entersFromLeft ? '0% 50%' : '100% 50%' }, { autoAlpha: 1, xPercent: 0, rotateY: 0, duration: .34, ease: 'none' }, '<')
                  .fromTo(nextCopy, { autoAlpha: 0, xPercent: entersFromLeft ? -18 : 18 }, { autoAlpha: 1, xPercent: 0, duration: .3, ease: 'none' }, '<.04')
                  .call(function () { setStudioSlide(step); })
                  .to({}, { duration: .36 });
              }(storyStep));
            }
          }
          window.addEventListener('load', function () { window.ScrollTrigger.refresh(); }, { once: true });
        }
      }
      if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.addEventListener('pointermove', function (event) {
          document.body.style.setProperty('--cursor-x', event.clientX + 'px');
          document.body.style.setProperty('--cursor-y', event.clientY + 'px');
          document.body.classList.add('cursor-aurora');
        }, { passive: true });
        document.addEventListener('pointerleave', function () { document.body.classList.remove('cursor-aurora'); });
      }
    }());
  


    (function () {
      if (!window.THREE || !document.documentElement.hasAttribute('data-enable-deterministic-3d')) return;
      var T = window.THREE;
      var palette = { floor: 0x121c29, floorAlt: 0x172536, wall: 0x27384b, wood: 0xc99162, leather: 0x9a633e, blue: 0x193b5a, black: 0x090f16, light: 0xe8f1ff };
      function makeMaterial(color, roughness, metalness) { return new T.MeshStandardMaterial({ color: color, roughness: roughness == null ? .76 : roughness, metalness: metalness == null ? .08 : metalness }); }
      function buildPlan(host) {
        var renderer = new T.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = T.PCFSoftShadowMap;
        renderer.outputColorSpace = T.SRGBColorSpace;
        renderer.toneMapping = T.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
        renderer.domElement.className = 'studio-3d-canvas';
        host.classList.add('has-3d-plan');
        host.prepend(renderer.domElement);
        var scene = new T.Scene();
        scene.background = new T.Color(0x070b10);
        var camera = new T.PerspectiveCamera(34, 1, .1, 80);
        camera.position.set(16.8, 19.5, 20.6);
        camera.lookAt(8, 0, 7);
        scene.add(new T.HemisphereLight(0x9ab7d5, 0x06090d, 1.3));
        var key = new T.DirectionalLight(0xcadcf3, 2.2); key.position.set(5, 18, 8); key.castShadow = true; key.shadow.mapSize.set(1024, 1024); scene.add(key);
        var fill = new T.PointLight(0x6f82ff, 18, 18, 2); fill.position.set(8, 6, 7); scene.add(fill);
        function box(x, y, z, w, h, d, material, cast) { var mesh = new T.Mesh(new T.BoxGeometry(w, h, d), material); mesh.position.set(x, y, z); mesh.castShadow = cast !== false; mesh.receiveShadow = true; scene.add(mesh); return mesh; }
        function floor(x, z, w, d, alt) { box(x + w / 2, -.1, z + d / 2, w, .2, d, makeMaterial(alt ? palette.floorAlt : palette.floor, .92, .02), false); }
        function wallX(x, z, w) { box(x + w / 2, .82, z, w, 1.64, .22, makeMaterial(palette.wall, .62, .16)); }
        function wallZ(x, z, d) { box(x, .82, z + d / 2, .22, 1.64, d, makeMaterial(palette.wall, .62, .16)); }
        function chair(x, z, rot) { var g = new T.Group(); var seat = new T.Mesh(new T.BoxGeometry(.72,.24,.72), makeMaterial(palette.leather,.62,.03)); seat.position.y=.48; seat.castShadow=true; g.add(seat); var back = new T.Mesh(new T.BoxGeometry(.72,.7,.16), makeMaterial(palette.leather,.62,.03)); back.position.set(0,.84,-.28); back.castShadow=true; g.add(back); var base = new T.Mesh(new T.CylinderGeometry(.05,.08,.42,12), makeMaterial(0x111923,.4,.5)); base.position.y=.2; g.add(base); g.position.set(x,0,z); g.rotation.y=rot || 0; scene.add(g); }
        function desk(x, z, w, d) { box(x, .58, z, w, .16, d, makeMaterial(palette.wood,.55,.04)); box(x - w/2 + .16,.3,z-d/2+.16,.18,.6,.18,makeMaterial(0x39291f,.8,.02)); box(x + w/2 - .16,.3,z+d/2-.16,.18,.6,.18,makeMaterial(0x39291f,.8,.02)); }
        function microphone(x,z) { box(x,.78,z,.06,.46,.06,makeMaterial(0x101821,.35,.55)); var top=new T.Mesh(new T.SphereGeometry(.11,12,12),makeMaterial(0x101821,.35,.55)); top.position.set(x,.99,z); scene.add(top); }
        // Exact floor rectangles from the approved 2D plan: 8, 4, 6, 7, 9, 5, 3, foyer, 2 and 1.
        floor(0,0,5,3.5,true); floor(5,0,2,14,false); floor(7,0,5,3.5,true); floor(12,0,4,3.5,false); floor(0,3.5,5,3.5,false); floor(7,3.5,9,10.5,true); floor(0,7,4,2.5,true); floor(4,7,1,2.5,false); floor(0,9.5,2,4.5,false); floor(2,9.5,3,4.5,true);
        // Exterior envelope and plan walls. Gaps are literal missing wall sections.
        wallX(0,0,16); wallX(0,14,16); wallZ(0,0,14); wallZ(16,0,14);
        wallX(0,3.5,5); wallX(0,7,5); wallX(0,9.5,5); wallX(7,3.5,9);
        wallZ(5,0,.95); wallZ(5,2.1,1.4); wallZ(5,3.5,.85); wallZ(5,5.45,1.55); wallZ(5,7,.45); wallZ(5,8.55,.95);
        wallZ(7,0,.85); wallZ(7,2.25,2.05); wallZ(7,5.25,1.15); wallZ(7,7.8,6.2);
        wallZ(12,0,.95); wallZ(12,2.25,1.25);
        wallZ(4,7,.72); wallZ(4,8.78,.72); wallZ(2,9.5,.85); wallZ(2,11.45,2.55);
        // Furniture: keeps the same cool 3D language, while room 1 intentionally remains clear.
        desk(2.45,1.42,2.25,.72); chair(2.45,2.25,Math.PI); box(2.45,.98,.9,.65,.36,.08,makeMaterial(0x101820,.35,.48));
        var round = new T.Mesh(new T.CylinderGeometry(1.06,1.06,.16,40), makeMaterial(palette.wood,.54,.03)); round.position.set(2.5,.57,5.2); round.castShadow=true; scene.add(round); chair(2.5,3.88,0); chair(3.82,5.2,-Math.PI/2); chair(2.5,6.52,Math.PI); chair(1.18,5.2,Math.PI/2); microphone(2.15,5.1); microphone(2.85,5.1); microphone(2.5,5.65);
        desk(1.95,8.1,3.15,.55); box(1.2,.9,8.1,.45,.7,.45,makeMaterial(0xe7edf4,.35,.1)); box(3.45,.84,8.1,.45,.62,.45,makeMaterial(0x111922,.4,.35));
        box(1,.85,11.3,1.2,.82,.16,makeMaterial(0xe9eef5,.35,.18)); for(var bulb=0;bulb<6;bulb++){var dot=new T.Mesh(new T.SphereGeometry(.07,10,10),new T.MeshBasicMaterial({color:0xffecc6}));dot.position.set(.46,.85,10.92+bulb*.15);scene.add(dot);} chair(1,12.25,Math.PI);
        // Hall, lounge and producers.
        box(5.95,.42,1.82,1.18,.38,.6,makeMaterial(palette.blue,.65,.02)); box(5.95,.72,1.82,1.18,.25,.2,makeMaterial(palette.blue,.65,.02));
        box(9.55,.45,1.82,2.1,.5,.85,makeMaterial(palette.blue,.62,.02)); box(9.55,.85,1.57,2.1,.42,.22,makeMaterial(palette.blue,.62,.02)); desk(14,1.55,1.65,.62); chair(14,2.35,Math.PI);
        // Locked room 5 composition: large table, four chairs, microphones, cameras, LED wall and softbox.
        desk(11.5,8.3,4.6,2.55); chair(10.05,6.65,0); chair(12.95,6.65,0); chair(10.05,9.95,Math.PI); chair(12.95,9.95,Math.PI); microphone(10.42,7.72); microphone(12.58,7.72); microphone(10.42,8.88); microphone(12.58,8.88);
        for(var led=0;led<11;led++){var bar=box(8.05+led*.63,1.47,3.92,.055,.9+(led%3)*.24,.06,new T.MeshStandardMaterial({color:palette.light,emissive:palette.light,emissiveIntensity:1.5,roughness:.25}),false);bar.position.y=1.1;}
        box(11.5,2.2,5.55,1.15,.16,.82,new T.MeshStandardMaterial({color:0xf1f5fb,emissive:0x5a6c83,emissiveIntensity:.35,roughness:.35}),false); box(11.5,2.72,5.55,.06,.85,.06,makeMaterial(0x313d4b,.35,.45));
        [[8.9,7.1],[14.1,7.1],[8.9,10.2],[14.1,10.2]].forEach(function(pos){var cam=box(pos[0],.88,pos[1],.38,.28,.38,makeMaterial(0x101820,.3,.65)); box(pos[0],.4,pos[1],.07,.65,.07,makeMaterial(0x101820,.3,.65));});
        function resize() { var rect = host.getBoundingClientRect(); var w=Math.max(1,rect.width), h=Math.max(1,rect.height); renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.render(scene,camera); }
        if (window.ResizeObserver) new ResizeObserver(resize).observe(host); else window.addEventListener('resize',resize,{passive:true}); resize();
      }
      document.querySelectorAll('.studio-explore').forEach(buildPlan);
    }());

// Узнать сколько всего слайдов в каждом слайдере и написать это в спец теге
var sliders = $(".projects__slider");
for(var i = 0; i < sliders.length; i++) {
	var slides = sliders[i].querySelectorAll(".projects__slide");
	$(sliders[i]).siblings(".projects__count-slide").attr("data-length", slides.length);
	$(sliders[i]).siblings(".projects__count-slide").text("1/" + slides.length);
}
// Добавление своих кастомных стрелок для слайдеров
$(".projects__slider").slick({
	slidesToShow: 1,
	prevArrow: '<svg class="projects__arrow projects__arrow--prev" width="11" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.5 20.1"><path class="projects__arrow-path" fill="none" stroke="#828181" stroke-miterlimit="10" d="M10.2 19.5L.9 10.2 10.2.5"/></svg>',
    nextArrow: '<svg class="projects__arrow projects__arrow--next" width="11" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.6 19.9"><path class="projects__arrow-path" fill="none" stroke="#828181" stroke-miterlimit="10" d="M.5.4l9.3 9.3-9.3 9.8"/></svg>'
});
// Добавление счетчика для слайдов
$(".projects__slider").on('afterChange', function(event, slick, currentSlide){
 	var elemForCount = $(this).siblings(".projects__count-slide");
 	elemForCount.text(currentSlide + 1 + "/" + elemForCount.attr("data-length"));
});

 // Окно прайс-листа при закрытие
$(".price__descr .descr__close").on("click", function() {
	$(this).parent().css("display", "none");

	setInterval(function() {
		$(".price__descr").removeAttr("style");
	}, 1000);
});

// Слайдеры для отзывов и шагов
$(".feed-item__slider").slick({
	slidesToShow: 1,
	nextArrow: "<div class='feed-item__arrow feed-item__arrow--next'><svg width='10' height='20' xmlns='http://www.w3.org/2000/svg'><path fill='none' stroke='#000' stroke-miterlimit='10' d='M0 20l10-10M0 0l10 10.7'/></svg></div>",
	prevArrow: "<div class='feed-item__arrow feed-item__arrow--prev'><svg width='10' height='20' xmlns='http://www.w3.org/2000/svg'><path fill='none' stroke='#000' stroke-miterlimit='10' d='M10 0L0 10m10 10L0 9.3'/></svg></div>"
});

// Открытие вопросов в секции faq 
$(".faq__btn").on("click", function() {
	if($(this).hasClass("faq__btn--opened")){
		$(this).siblings(".faq__quest").removeClass("faq__quest--opened");
		$(this).removeClass("faq__btn--opened");
		$(this).siblings(".faq__answer").slideUp(300);
	} else {
		$(this).siblings(".faq__quest").addClass("faq__quest--opened");
		$(this).addClass("faq__btn--opened");
		$(this).siblings(".faq__answer").slideDown(300);
	}
	
	
	


});

// Формы 
$("input").on("focus", function() {
	$(this).siblings(".form__name").addClass("form__name--active");
});
$("input").on("blur", function() {
	if(($(this).val() == "") || ($(this).val() == "+7(___) ___-____")){
		$(this).siblings(".form__name").removeClass("form__name--active");
	}
});
// Маска для телефона 
$("input[type='tel']").mask("+7(999) 999-9999");



// Открытие меню 
$(".menu__mobile").on("click", function() {
	$(".menu__list").slideToggle(300, function() {
		if($(this).css("display") === "none"){
			$(this).removeAttr("style");
		} 
	});
	
});

// Плавный переход к секциям
 $(".menu__list").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1000);
});

 // Переход к началу  страницы
 $(window).scroll(function() {
 
	if($(this).scrollTop() >= 200) {
	 
		$('.page__scroll').fadeIn();
	 
	} else {
	 
		$('.page__scroll').fadeOut();
	 
	}
	 
	});
	 
	$('.page__scroll').click(function() {
	 
	$('body,html').animate({scrollTop:0},800);
 
});

// Модальное окно 
$(".modal__close").on("click", function() {
	$(".modal").css("display", "none");
	$("html, body").css({
		"overflow" : "auto",
		"overflow-x" : "hidden"
	});
});

$(".btn--header, .btn--main-screen").on("click", function() {
	$(".modal").css("display", "block");
	$("html, body").css("overflow", "hidden");
});

// Отправка формы 
$(".callback .form").submit(function(e) {
	// Проверка форм
	var tel = $(".callback input[name='phone']").val().split("");
	var email = $(".callback input[name='email']").val();
	var name = $(".callback input[name='name']").val().split("");
	var message = $(".callback input[name='message']").val();
	//Регулярка для проверки mail
	var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   

	var validName, validTel, validEmail;
	if(name.length < 3) {
		$(".callback input[name='name']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	
	} else {
		validName = true;
		$(".callback input[name='name']").siblings(".form__name").removeClass("form__name--error");
	}

	if(tel.length != 16) {
		$(".callback input[name='phone']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	} else {
		validTel = true;
		$(".callback input[name='phone']").siblings(".form__name").removeClass("form__name--error");
	}

	if(emailReg.test(email) == false){
		$(".callback input[name='email']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	} else {
		validEmail = true;
		$(".callback input[name='email']").siblings(".form__name").removeClass("form__name--error");
	}

	if(validEmail == true && validTel == true && validName == true){
		$.ajax({
			type: "POST",
			url: "js/mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("done");
		});
		return false;
	}

		
});

$(".modal__form").submit(function(e) {
	// Проверка форм
	var tel = $(".modal__form input[name='phone']").val().split("");
	var email = $(".modal__form input[name='email']").val();
	var name = $(".modal__form input[name='name']").val().split("");
	var message = $(".modal__form input[name='message']").val();
	//Регулярка для проверки mail
	var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
   

	var validName, validTel, validEmail;
	if(name.length < 3) {
		$(".modal__form input[name='name']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	
	} else {
		validName = true;
		$(".modal__form input[name='name']").siblings(".form__name").removeClass("form__name--error");
	}

	if(tel.length != 16) {
		$(".modal__form input[name='phone']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	} else {
		validTel = true;
		$(".modal__form input[name='phone']").siblings(".form__name").removeClass("form__name--error");
	}

	if(emailReg.test(email) == false){
		$(".modal__form input[name='email']").siblings(".form__name").addClass("form__name--error");
		e.preventDefault();
	} else {
		validEmail = true;
		$(".modal__form input[name='email']").siblings(".form__name").removeClass("form__name--error");
	}

	if(validEmail == true && validTel == true && validName == true){
		$.ajax({
			type: "POST",
			url: "js/mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("done");
		});
		return false;
	}

		
});

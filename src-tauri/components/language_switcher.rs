use yew::prelude::*;
use yew_i18n::prelude::*;

#[function_component(LanguageSwitcher)]
pub fn language_switcher() -> Html {
    let context = use_context::<I18nContext>().expect("No I18nContext found");

    let change_language = {
        let context = context.clone();
        Callback::from(move |_| {
            context.set_locale("es".to_string());
        })
    };

    let change_language_en = {
        let context = context.clone();
        Callback::from(move |_| {
            context.set_locale("en".to_string());
        })
    };

    html! {
        <div>
            <button onclick={change_language}>{ "ES" }</button>
            <button onclick={change_language_en}>{ "EN" }</button>
        </div>
    }
}

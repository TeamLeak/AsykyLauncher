use yew::prelude::*;

#[function_component(Skeleton)]
pub fn skeleton() -> Html {
    html! {
        <div class="skeleton">
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
            <div class="skeleton-line"></div>
        </div>
    }
}

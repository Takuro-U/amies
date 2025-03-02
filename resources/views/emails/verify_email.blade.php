@component('mail::message')
# ご登録ありがとうございます

以下のボタンをクリックして、メールアドレスを認証してください。

@component('mail::button', ['url' => $verify_url])
認証
@endcomponent

もしこのメールに心当たりがない場合は、無視してください。

{{ config('app.name') }}

<hr style="border-top: 1px solid #ccc;">
<p style="font-size: 14px;">もし'認証'ボタンが正常に動作しない場合は、以下のURLをクリックしてください。</p>
<a style="font-size: 14px;" href="{{ $verify_url }}">{{ $verify_url }}</a>

@endcomponent
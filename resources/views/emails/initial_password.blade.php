@component('mail::message')
# 仮登録完了のお知らせ

AMie'sへの仮登録が完了しました。

初期パスワードでログイン後，パスワードを変更してください

<p style="font-size: 16px;"><strong>初期パスワード:</strong><span style="color: #2c5282;">{{ $initial_password }}</span></p>

{{ config('app.name') }}

@endcomponent
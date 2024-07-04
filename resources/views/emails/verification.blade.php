<div style="display: flex; flex-direction: column ; align-items : center " >
    
    <h1>Hey {{$name}} !</h1>
    <img style="width : 50%"
    src="https://img.freepik.com/photos-gratuite/securite-informatique-cadenas-login-mot-passe_107791-16191.jpg?t=st=1719179224~exp=1719182824~hmac=933d2f40c44724cc23961c1a267a02346683f480251f463ea3f809e481d15c23&w=996">
    <h3 style="padding: 0 20% 0 20%; font-family: Arial, Helvetica, sans-serif;">
        Thanks for registering for an account on ProFile! Before we get started, we just need to confirm that this is you. <br>
        <span style="text-decoration: underline; color: blue;">Click below to verify your email address:</span> </h3>
    <a href={{$url}} style="text-decoration :none; width: 20% ;">
        <div style="background: blue; padding : 20px ; border-radius : 10px;color : white ; display: flex ; justify-content : center">
            Verify Email
        </div>
    </a>
    
</div>
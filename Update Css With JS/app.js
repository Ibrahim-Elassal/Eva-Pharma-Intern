const myInputs = document.querySelectorAll('.controls input');

function changeEvents(){
  const {sizing,name} = this.dataset ;
  const unit = sizing || '' ;
  const value = this.value ;

  document.documentElement.style.setProperty(`--${name}` , value + unit);

}
  myInputs.forEach((input)=> {
    input.addEventListener('change' ,changeEvents );
    input.addEventListener('mousemove' ,changeEvents );
  });



async function fetchData(urlApi,data){
  const response = await fetch(urlApi, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {"Content-type": "application/json; charset=UTF-8"},
  })
  return await response.json();
}


const fechaAlta = document.getElementById('fecha-alta');
const fechaBaja = document.getElementById('fecha-baja');

const dpFechaAlta = new Datepicker(fechaAlta, {
  format: 'dd/mm/yyyy'
}); 

const dpFechaBaja = new Datepicker(fechaBaja, {
  format: 'dd/mm/yyyy'
});

let accionForm = 'guardar'

let $ = (id)=> document.getElementById(id);

const validar = $('validar')
const formulario = $('form-articulo')
const sku = $('sku');
const descontinuado = $('descontinuado');
const articulo = $('articulo');
const marca = $('marca');
const modelo = $('modelo');
const departamento = $('departamento');
const clase = $('clase');
const familia = $('familia');
const stock = $('stock');
const cantidad = $('cantidad');
const accion = $('accion');


const message = (id,message,color)=>{
  $(`span-${id}`).style.color = color;
  $(`span-${id}`).innerHTML = message;
}



const loadingButton = (id) => {
  $(id).disabled = true;
  $(id).style.width = '138px';
  $(id).innerHTML = `
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Cargando...
  `
}

const removeLoadingButton = (id,text) => {
  setTimeout(()=>{
    $(id).disabled = false;
    $(id).innerHTML = text;
    $(id).style.width = '59px';
  },300)

}


const formatedDate = (date)=>{
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
}

let globalSku = ''
const validarSku = () => {

  if(sku.value === ''){
    message('sku','Ingrese un Sku','red')
    return false;
  } 
  else if(isNaN(sku.value)){
    message('sku','Ingrese un valor numérico','red')
    return false;
  }
  else if(sku.value.length > 6 ){
    message('sku','El Sku tiene un máximo de 6 dígitos','red')
    return false;
  }
  else{
    if(accionForm === 'guardar'){
      $(`span-sku`).innerHTML = "";
    }

  }
  return true;
}

const reinicarEstado = () =>{
  accionForm = 'guardar'
  accion.innerHTML = 'guardar'

  sku.value = ''
  descontinuado.checked = false
  limpiarCamposForm();
  limpiarMessageForm();
  disabledForm();
}

const enabledForm = () =>{

  if(accionForm === 'actualizar')
      descontinuado.disabled = false
  else
    descontinuado.disabled = true

  articulo.disabled = false
  marca.disabled = false
  modelo.disabled = false
  departamento.disabled = false
  clase.disabled = false
  familia.disabled = false
  stock.disabled = false
  cantidad.disabled = false
  accion.disabled = false

}

const disabledForm = () => {

  descontinuado.disabled = true
  articulo.disabled = true
  marca.disabled = true
  modelo.disabled = true
  departamento.disabled = true
  clase.disabled = true
  familia.disabled = true
  stock.disabled = true
  cantidad.disabled = true
  accion.disabled = true
}

const limpiarMessageForm = () =>{
  $(`span-sku`).innerHTML = "";
  $(`span-articulo`).innerHTML = "";
  $(`span-marca`).innerHTML = "";
  $(`span-modelo`).innerHTML = "";
  $(`span-stock`).innerHTML = "";
  $(`span-cantidad`).innerHTML = "";
}

const limpiarCamposForm = () => {
  articulo.value = ''
  marca.value = ''
  modelo.value = ''
  stock.value = ''
  cantidad.value = ''
  fechaAlta.value = ''
  fechaBaja.value = ''
  departamento.innerHTML = ''
  clase.innerHTML = ''
  familia.innerHTML = ''
  descontinuado.checked = false
}

const validarVacios = () =>{

    let flag = true;
    if(articulo.value === '') {
      message('articulo','Ingresa un artículo','red')
      flag = false
    }
    else $(`span-articulo`).innerHTML = "";

    if(marca.value === '') {
      message('marca','Ingresa una marca','red')
      flag = false
    }
    else $(`span-marca`).innerHTML = "";

    if(modelo.value === '') {
      message('modelo','Ingresa un modelo','red')
      flag = false
    }
    else $(`span-modelo`).innerHTML = "";

    if(stock.value === '') {
      message('stock','Ingresa un stock','red')
      flag = false
    }
    else if(isNaN(stock.value)){
      message('stock','Ingresa un valor numérico','red')
      flag = false
    }
    else $(`span-stock`).innerHTML = "";

    if(cantidad.value === '') {
      message('cantidad','Ingresa una cantidad','red')
      flag = false
    }
    else if(isNaN(cantidad.value)){
      message('cantidad','Ingresa un valor numérico','red')
      flag = false
    }
    else $(`span-cantidad`).innerHTML = "";

    if(departamento.value == ''){
      message('departamento','Selecciona un departamento','red')
      flag = false
    }
    else $(`span-departamento`).innerHTML = "";

    if(clase.value == ''){
      message('clase','Selecciona una clase','red')
      flag = false
    }
    else $(`span-clase`).innerHTML = "";

    if(familia.value == ''){
      message('familia','Selecciona una familia','red')
      flag = false
    }
    else $(`span-familia`).innerHTML = "";

    return flag;
}

const validarFormulario = () => {

  if(validarVacios()){
    if(+cantidad.value > +stock.value){
      message('cantidad','Ingresa una cantidad menor al stock','red');
      return false
    }
    $(`span-cantidad`).innerHTML = "";
    return true;
  }
  else
  {
    return false;
  }

}

const createArticle = () => {

    if(accionForm === 'guardar'){
        return {
          sku: sku.value,
          articulo : articulo.value,
          marca : marca.value,
          modelo : modelo.value,
          departamento : departamento.value,
          clase : clase.value,
          familia : familia.value,
          cantidad : cantidad.value,
          stock : stock.value
      }
    }else{
      return {
        sku: sku.value,
        articulo : articulo.value,
        marca : marca.value,
        modelo : modelo.value,
        departamento : departamento.value,
        clase : clase.value,
        familia : familia.value,
        cantidad : cantidad.value,
        stock : stock.value,
        descontinuado: descontinuado.checked ? 1 : 0
    }
    }


}

const mostrarArticulo = (data)=>{

  
  if(data.descontinuado.data[0]){
    descontinuado.checked = true
  }
  else descontinuado.checked = false

  articulo.value = data.articulo
  marca.value = data.marca
  modelo.value = data.modelo
  stock.value = data.stock
  cantidad.value = data.cantidad
  fechaAlta.value = formatedDate(data.fechaAlta)
  fechaBaja.value = formatedDate(data.fechaBaja)
}

const selected = (itemSku,item,key) =>{
  let selected = ''
  if(itemSku.length > 0){
    const dep = itemSku[0];
    if(dep[key] === item[key]){
      selected = 'selected'
    }
  }

  return selected
}

const consultarArticulo = async () => {
  try {

    loadingButton('validar');
    const id = sku.value;
    const articulo = await fetchData('http://localhost:5000/articulo',{id});
    

    if(articulo?.response !== undefined){
      message('sku','Artículo no encontrado, puedes agregarlo','green');
      accionForm = 'guardar';
      accion.innerHTML = 'Guardar'
      limpiarCamposForm();
      inputsSelectInit()

    }
    else{

      limpiarCamposForm();
      mostrarArticulo(articulo[0])

      message('sku',
      `Artículo encontrado 
       <a href="javascript:;" id="eliminar" class="eliminar" >Eliminar</a>`,
      'green');

      // data-bs-toggle="modal" data-bs-target="#modal-elminar"

      accionForm = 'actualizar';
      accion.innerHTML = 'Actualizar'
      inputsSelectInit()

      $('eliminar').addEventListener('click',async (e)=>{
        eliminar()
      })

    }
    enabledForm();

  } catch (error) {
    console.log(error)
    disabledForm()
  }
  finally{
    removeLoadingButton('validar','validar')
  }
}

const mostrarArticuloActualizado = async()=>{
  try {
    const id = sku.value;
    const articulo = await fetchData('http://localhost:5000/articulo',{id});
    limpiarCamposForm();
    mostrarArticulo(articulo[0])
    inputsSelectInit()
    
  } catch (error) {
    console.log(error)
  }
}

const  agregarArticulo = async()=>{
  try {

    const articulos = await fetchData('http://localhost:5000/insertarArticulo',createArticle());
    reinicarEstado();
    
  } catch (error) {
    console.log(error)
  }
  finally{
    Swal.fire({
      icon: 'success',
      title: 'Artículo agregado',
      showConfirmButton: false,
      timer: 1000
    })
  }
}

const actualizarArticulo = async () => {
  try {
    const articulos = await fetchData('http://localhost:5000/actualizarArticulo',createArticle());
    console.log(articulos)
    mostrarArticuloActualizado()
  } catch (error) {
    console.log(error)
  }finally{
    Swal.fire({
      icon: 'success',
      title: 'Artículo actualizado',
      showConfirmButton: false,
      timer: 1000
    })
  }
}

const eliminarArticulo = async () => {
  try {
    const id = sku.value
    const articulos = await fetchData('http://localhost:5000/eliminarArticulo',{id});
    console.log(articulos)
  } catch (error) {
    console.log(error)
  }
}

const  consultarDepartamentos = async()=>{
  try {

    const departamentos = await fetchData('http://localhost:5000/departamentos',{});
    const id = sku.value
    const departamentoSku = await fetchData('http://localhost:5000/departamento',{id});

    // sin datos
    if(departamentos?.response !== undefined){
      departamentos.innerHTML = '<option value="1">Sin datos</option>';
    }
    else{
      let options = `
          ${departamentos.map(departamento =>{
            const isSelected = selected(departamentoSku,departamento,'idDepartamento')
            const {idDepartamento,nombre} = departamento;
            return `<option ${isSelected} value="${idDepartamento}">${nombre}</option>`
          }).join('')}
        `
      departamento.innerHTML = options


    }

  } catch (error) {
    console.log(error)
  }


}

const  consultarClases = async(id)=>{
  try {

    const clases = await fetchData('http://localhost:5000/clases',{id});
    const idSku = sku.value
    const claseSku = await fetchData('http://localhost:5000/clase',{idSku});

    if(clases?.response !== undefined){
      clase.innerHTML = '<option value="1">Sin datos</option>';
    }
    else{
      let options = `
          ${clases.map((clase)=>{
            const isSelected = selected(claseSku,clase,'idClases')
            const {idClases,nombre} = clase;
            return `<option ${isSelected} value="${idClases}">${nombre}</option>`
          }).join()}
        `

        clase.innerHTML = options
    }
     
  } catch (error) {
    console.log(error)
  }
}

const  consultarFamilias = async(idDepartamento,idClase)=>{
  try {

    const familias = await fetchData('http://localhost:5000/familias',{idDepartamento,idClase});
    const idSku = sku.value
    const familiaSku = await fetchData('http://localhost:5000/familia',{idSku});
    if(familias?.response !== undefined){
      familia.innerHTML = '<option value="1">Sin datos</option>';
    }
    else{

      let options = `
          ${familias.map((familia)=>{
            const isSelected = selected(familiaSku,familia,'idFamilia')
            const {idFamilia,nombre} = familia;
            return `<option ${isSelected} value="${idFamilia}">${nombre}</option>`
          }).join()}
        `

        familia.innerHTML = options
    }
     
  } catch (error) {
    console.log(error)
  }
}

const inputsSelectInit = async() =>{
    if(accionForm === 'actualizar'){
      await consultarDepartamentos();
      await consultarClases(departamento.value);
      await consultarFamilias(departamento.value,clase.value);
    }
    else{
      await consultarDepartamentos();
      await consultarClases(departamento.value);
    }

}

const eliminar = ()=>{
      try{
      Swal.fire({
        title: '¿Estás seguro de que quieres eliminar el artículo?',
        text: "Ya no se podrá deshacer esta solicitud",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          eliminarArticulo()
          reinicarEstado();
          Swal.fire(
            'Eliminado',
            'El artículo ha sido eliminado',
            'success'
          )
        }
      })
    }
    catch (error) {
      console.log(error)
    } 
}


departamento.addEventListener('change',async (e)=>{
  const id = e.target.value
  await consultarClases(id);
  await consultarFamilias(id,clase.value);
})

clase.addEventListener('change',(e)=>{
  const idClase = e.target.value
  const idDepartamento = departamento.value
  consultarFamilias(idDepartamento,idClase);
})

validar.addEventListener('click',(e) => {
  e.preventDefault();

  globalSku = sku.value;
  if(validarSku()){
    consultarArticulo();
    limpiarMessageForm();
  }

})

const sameSku = ()=>{
  if(globalSku != sku.value){
      message('sku',`Estás intentando actualizar un Sku diferente a ${globalSku},
      da clic en validar para agregar/actualizar este Sku`,'red')
      return false;
  }
  else{
    message('sku',
    `Artículo encontrado 
    <a href="javascript:;" id="eliminar" class="eliminar" >Eliminar</a>`,
    'green');
  }
  return true;
}

formulario.addEventListener('submit',(e) => {
    e.preventDefault();

    if(validarFormulario()){

      if(validarSku()){
        switch(accionForm){
          case 'guardar':
            agregarArticulo();
          break;
          case 'actualizar':
            if(sameSku()){
              actualizarArticulo();
            }
          break;
        }
      }

    }
})




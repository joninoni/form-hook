import {useForm,} from "react-hook-form"


const App = () => {

	const {register,handleSubmit,formState:{errors},watch} = useForm()
	const onSubmit = (data) => console.log(data)

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
		>

			<label htmlFor="nombre">Nombre</label>
			<input 
				type="text"
				id="nombre"
				{...register("nombre",{
					required:{
						value : true,
						message : "Este campo es requerido",
					},
					minLength :{
						value : 2,
						message : "El nombre debe tener mas de dos letras"
					},
					maxLength :{
						value : 20,
						message : "El nombre debe llevar solo 20 letras o menos"
					}
				})}/>

			{errors.nombre && <p>{errors.nombre.message}</p>}
				
			<label htmlFor="correo">Correo</label>
			<input
				type="email"
				id="email"
				{...register("email",{
					required :{
						value : true,
						message : "Este campo es requerido"
					},
					pattern :{
						value : /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
						message : "Correo no valido"
					}
				})}
			/>

			{errors.email && <p>{errors.email.message}</p>}

			<label htmlFor="password">Contraseña</label>
			<input 
				type="password"
				id="password"
				{...register("password",{
					required :{
						value : true,
						message : "Este campo es requerido"
					},
					minLength :{
						value : 6,
						message : "La contraseña debe tener 6 caracteres o mas"
					}
				})}
			/>

			{errors.password && <p>{errors.password.message}</p>}

			<label htmlFor="confirmarPassword">Confirmar contraseña</label>
			<input 
				type="password"
				id="confirmarPassword"
				{...register("confirmarPassword",{
					required : {
						value : true,
						message : "Este campo es obligatorio"
					},
					validate : value => {
						return value === watch("password") ? true : "Las contraseñas no coinciden"
					}
				})}
			/>

			{errors.confirmarPassword && <p>{errors.confirmarPassword.message}</p>}

			<label htmlFor="fecha">Fecha</label>
			<input
				type="date"
				id="fecha"
				{...register("fecha",{
					required : {
						value:true,
						message : "Este campo es requerido"
					},
					validate : value => {
						const fechaActual = new Date().getFullYear()
						const fechaNacimeinto = new Date(value).getFullYear()
						const edad = fechaActual - fechaNacimeinto
						return edad >= 18 ? true : "Debes ser mayor de edad"
					}
				})}
			/>

			{errors.fecha && <p>{errors.fecha.message}</p>}

			<label htmlFor="pais">Pais</label>
			<select 
				name="pais"
				id="pais"
				{...register("pais",{
					required : {
						value : true,
						message : "Pais es requerido"
					}
				})}				
			>
				<option value="mx">Mexico</option>
				<option value="co">Colombia</option>
				<option value="ar">Argentina</option>
			</select>

			{
				watch("pais") === "ar" && (
					<>
						<input
							type="text"
							placeholder="Provincia"
							{...register("provincia",{
								required :{
									value : true,
									message : "Provincia requerida"
								}
							})}
						/>
						{errors.provincia && <p>{errors.provincia.message}</p>}
					</>
				)
			}

			<label htmlFor="foto">Escoje una foto</label>
			<input type="file" id="foto" {...register("archivo",{required : true})}/>

			<div>
				<label htmlFor="terminos">Acepta los terminos</label>
				<input
					type="checkbox"
					id="terminos"
					{...register("terminos",{
						required : {
							value : true,
							message : "Debes aceptar los terminos"
					}
					})}
				/>

				{errors.terminos && <p>{errors.terminos.message}</p>}
			</div>

			<input type="submit"/>
		</form>		
	)
}

export default App
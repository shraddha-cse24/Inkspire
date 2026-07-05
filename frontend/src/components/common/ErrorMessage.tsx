interface Props{
    message:string
}

export default function Error({message}:Props){

return(

<div className="glass-card p-6 border-red-300">

<p className="text-red-500 font-medium">
{message}
</p>

</div>

)

}
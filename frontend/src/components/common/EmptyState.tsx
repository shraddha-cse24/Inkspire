interface Props{
title:string
}

export default function EmptyState({title}:Props){

return(

<div className="glass-card p-12 text-center">

<h2 className="text-2xl font-display">
{title}
</h2>

</div>

)

}
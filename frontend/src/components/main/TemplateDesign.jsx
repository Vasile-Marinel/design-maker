import React, { useEffect, useState } from "react";
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"; //useNavigate → permite navigarea programatica catre alta pagina

const TemplateDesign = ({type}) => {

    const navigate = useNavigate() //navigarea programatica catre alta pagina
    const [templates, setTemplates] = useState([]) //state-ul pentru template-uri

    useEffect(() => {
        const get_templates = async () => {
            try {
                const { data } = await api.get('/api/templates')
                setTemplates(data.templates) //setez template-urile in state
            } catch (error) {
                console.log(error)
            }
        }
        get_templates()
    }, [])

    const add_template = async (Tid) => {
        try {
            const { data } = await api.get(`/api/add-user-template/${Tid}`) //apeleaza api-ul pentru a adauga un template
            navigate(`/design/${data.design?.id}/edit`) //navigheaza catre pagina de editare a design-ului
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={`grid gap-2 ${type ? 'grid-cols-2' : 'grid-cols-4 mt-5'}`}>
                {
                    templates.map((design, i) => <div onClick={() => add_template(design.id)} className={`relative cursor-pointer group w-full ${type ? "h-[100px]" : "h-[220px] px-2"}`}>   {/* Afiseaza 8 designuri recente intr-un carousel*/}
                        <div className={`w-full h-full block bg-[#ffffff12] rounded-md ${type ? '' : 'p-4'}`}>
                            <img className='w-full h-full rounded-md overflow-hidden' src={design.imageUrl} alt="" />
                        </div>
                    </div>)
                }
            </div>
        </>
    )
}

export default TemplateDesign
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { BsGrid1X2, BsFillImageFill, BsFolder, BsCloudUploadFill, BsQrCode } from "react-icons/bs";
import { FaShapes } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { RxTransparencyGrid } from "react-icons/rx";
import TemplateDesign from "../components/main/TemplateDesign";
import MyImages from "../components/MyImages";
import Projects from "../components/Projects";
import { QRCodeCanvas } from "qrcode.react";
import CreateComponent from "../components/CreateComponent";
import api from "../utils/api";
import InitialImage from "../components/InitialImage";
import BackgroundImages from "../components/BackgroundImages";

const Main = () => {

    const { designId } = useParams()
    const [state, setState] = useState('')
    const [current_component, setCurrentComponent] = useState('')
    const [color, setColor] = useState('')
    const [image, setImage] = useState('')
    const [rotate, setRotate] = useState(0)
    const [left, setLeft] = useState('')
    const [top, setTop] = useState('')
    const [width, setWidth] = useState('')
    const [height, setHeight] = useState('')
    const [opacity, setOpacity] = useState('')
    const [zIndex, setZIndex] = useState('')

    const [padding, setPadding] = useState('')
    const [font, setFont] = useState('')
    const [weight, setWeight] = useState('')
    const [text, setText] = useState('')
    const [radius, setRadius] = useState(0)

    const [show, setShow] = useState({
        status: true,
        name: ''
    })

    const setElements = (type, name) => {
        setState(type)
        setShow({
            state: false,
            name
        })
    }

    const moveElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(currentDiv)
            const left = parseInt(getStyle.left)
            const top = parseInt(getStyle.top)
            if (isMoving) {
                currentDiv.style.left = `${left + movementX}px`
                currentDiv.style.top = `${top + movementY}px`
            }
        }

        const mouseUp = (e) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            setLeft(parseInt(currentDiv.style.left))
            setTop(parseInt(currentDiv.style.top))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const resizeElement = (id, currentInfo) => {
        setCurrentComponent(currentInfo)

        let isMoving = true

        const currentDiv = document.getElementById(id)

        const mouseMove = ({ movementX, movementY }) => {
            const getStyle = window.getComputedStyle(currentDiv)
            const width = parseInt(getStyle.width)
            const height = parseInt(getStyle.height)
            if (isMoving) {
                currentDiv.style.width = `${width + movementX}px`
                currentDiv.style.height = `${height + movementY}px`
            }
        }

        const mouseUp = (e) => {
            isMoving = false
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)
            setWidth(parseInt(currentDiv.style.width))
            setHeight(parseInt(currentDiv.style.height))
        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const rotateElement = (id, currentInfo) => {
        setCurrentComponent("")
        setCurrentComponent(currentInfo)

        const target = document.getElementById(id)
        console.log(target);

        const mouseMove = ({ movementX, movementY }) => {

            const getStyle = window.getComputedStyle(target)

            const trans = getStyle.transform

            const values = trans.split('(')[1].split(')')[0].split(',')     //get the current rotation value, ex(in console log): matrix(1,0,0,1,0,0)

            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))     //get the angle of the rotation

            let deg = angle < 0 ? angle + 360 : angle

            if (movementX) {
                deg = deg + movementX
            }
            target.style.transform = `rotate(${deg}deg)`

        }
        const mouseUp = (e) => {
            window.removeEventListener('mousemove', mouseMove)
            window.removeEventListener('mouseup', mouseUp)

            const getStyle = window.getComputedStyle(target)
            const trans = getStyle.transform
            const values = trans.split('(')[1].split(')')[0].split(',')     //get the current rotation value, ex(in console log): matrix(1,0,0,1,0,0)
            const angle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI))     //get the angle of the rotation
            let deg = angle < 0 ? angle + 360 : angle
            setRotate(deg)

        }

        window.addEventListener('mousemove', mouseMove)
        window.addEventListener('mouseup', mouseUp)
    }

    const removeComponent = (id) => {
        const temp = components.filter(c => c.id !== id)
        setCurrentComponent('')
        setComponents(temp)
    }

    const remove_background = () => {
        const com = components.find(c => c.id === current_component.id)
        const temp = components.filter(c => c.id !== current_component.id)
        com.image = ''
        setImage("")
        setComponents([...temp, com])
    }

    const opacityHandle = (e) => {
        setOpacity(parseFloat(e.target.value))
    }

    const [components, setComponents] = useState([
        {
            name: "main_frame",
            type: "rect",
            id: Math.floor((Math.random() * 100) + 1),
            height: 450,
            width: 650,
            z_index: 1,
            color: "#fff",
            image: "",
            setCurrentComponent: (a) => setCurrentComponent(a)
        }
    ])

    const createShape = (name, type) => {
        const style = {
            id: Date.now(),
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setComponents([...components, style])
    }

    const add_text = (name, type) => {
        const style = {
            id: Date.now(),
            name: name,
            type,
            left: 10,
            top: 10,
            opacity: 1,
            rotate,
            z_index: 10,
            padding: 6,
            font: 22,
            title: "Add text",
            weight: 400,
            color: '#3c3c3d',
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }

        setWeight('')
        setFont('')
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    const add_image = (img) => {
        setCurrentComponent('')
        const style = {
            id: Date.now(),
            name: 'image',
            type: 'image',
            left: 10,
            top: 10,
            opacity: 1,
            width: 200,
            height: 150,
            rotate,
            z_index: 2,
            ratius: 0,
            image: img,
            setCurrentComponent: (a) => setCurrentComponent(a),
            moveElement,
            resizeElement,
            rotateElement
        }
        setCurrentComponent(style)
        setComponents([...components, style])
    }

    useEffect(() => {       //pentru ca shape-urile sa ia dimensiunea figurilor de langa ele
        if (current_component) {

            const index = components.findIndex(c => c.id === current_component.id)
            const temp = components.filter(c => c.id !== current_component.id)

            if (current_component.name !== 'text') {       //pentru ca shape-urile sa ia dimensiunea figurilor de langa ele
                components[index].width = width || current_component.width
                components[index].height = height || current_component.height
                components[index].rotate = rotate || current_component.rotate
            }
            if (current_component.name === 'text') {       //pentru ca shape-urile sa ia dimensiunea figurilor de langa ele
                components[index].font = font || current_component.font
                components[index].padding = padding || current_component.padding
                components[index].weight = weight || current_component.weight
                components[index].title = text || current_component.title
            }
            if (current_component.name === 'image') {
                components[index].radius = radius || current_component.radius
            }

            if (current_component.name === 'main_frame' && image) {
                components[index].image = image || current_component.image
            }

            components[index].color = color || current_component.color

            if (current_component.name !== 'main_frame') {
                components[index].left = left || current_component.left
                components[index].top = top || current_component.top
                components[index].opacity = opacity || current_component.opacity
                components[index].z_index = zIndex || current_component.z_index
            }

            setComponents([...temp, components[index]])

            setColor('')
            setWidth('')
            setHeight('')
            setLeft('')
            setTop('')
            setRotate(0)
            setOpacity('')
            setZIndex('')
            setText('')
        }
    }, [color, image, left, top, width, height, opacity, zIndex, padding, font, weight, text, radius])

    const [qrText, setQrText] = useState("");

    useEffect(() => {
        const get_design = async () => {
            try {
                const { data } = await api.get(`/api/user-design/${designId}`)
                const { design } = data

                for (let i = 0; i < design.length; i++) {
                    design[i].setCurrentComponent = (a) => setCurrentComponent(a)
                    design[i].moveElement = moveElement
                    design[i].resizeElement = resizeElement
                    design[i].rotateElement = rotateElement
                    design[i].remove_background = remove_background
                }

                setComponents(design)
            } catch (error) {
                console.log(error)
            }
        }
        get_design()
    }, [designId])

    return (
        <div className='min-w-screen h-screen bg-black'>
            <Header components={components} designId={designId} />
            <div className='flex h-[calc(100%-60px)] w-screen'>
                <div className='w-[80px] bg-[#18191B] z-50 h-full text-gray-400 overflow-y-auto'>
                    <div onClick={() => setElements('design', 'design')} className={`${show.name === 'design' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsGrid1X2 /></span>
                        <span className='text-xs font-medium'>Design</span>
                    </div>

                    <div onClick={() => setElements('shape', 'shape')} className={`${show.name === 'shape' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><FaShapes /></span>
                        <span className='text-xs font-medium'>Shapes</span>
                    </div>

                    <div onClick={() => setElements('image', 'uploadImage')} className={`${show.name === 'uploadImage' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsCloudUploadFill /></span>
                        <span className='text-xs font-medium'>Upload</span>
                    </div>

                    <div onClick={() => setElements('text', 'text')} className={`${show.name === 'text' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><TfiText /></span>
                        <span className='text-xs font-medium'>Text</span>
                    </div>

                    <div onClick={() => setElements('project', 'projects')} className={`${show.name === 'projects' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFolder /></span>
                        <span className='text-xs font-medium'>Project</span>
                    </div>

                    <div onClick={() => setElements('initImage', 'images')} className={`${show.name === 'images' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsFillImageFill /></span>
                        <span className='text-xs font-medium'>Image</span>
                    </div>

                    <div onClick={() => setElements('background', 'background')} className={`${show.name === 'background' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><RxTransparencyGrid /></span>
                        <span className='text-xs font-medium'>Background</span>
                    </div>

                    <div onClick={() => setElements('qrcode', 'qrcode')} className={`${show.name === 'qrcode' ? 'bg-[#252627]' : ''} w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}>
                        <span className='text-2xl'><BsQrCode /></span>
                        <span className='text-xs font-medium'>QR Code</span>
                    </div>
                </div>
                <div className='h-full w-[calc(100%-75px)]'>
                    <div className={`${show.status ? 'p-0 -left-[350px]' : 'px-8 left-[75px] py-5'} bg-[#252627] h-full fixed transition-all w-[350px] z-30 duration-700`}>
                        <div onClick={() => setShow({ name: '', status: true })} className='flex absolute justify-center items-center bg-[#252627] w-[20px] -right-2 text-slate-300 top-[40%] cursor-pointer h-[100px] rounded-full'>< MdKeyboardArrowLeft /></div>
                        {
                            state === 'design' && <div>
                                <TemplateDesign type="main" />
                            </div>
                        }

                        {
                            state === 'shape' && <div className='grid grid-cols-3 gap-2'>
                                <div onClick={() => createShape('shape', 'rect')} className='h-[90px] bg-[#3c3c3d] cursor-pointer'>
                                </div>
                                <div onClick={() => createShape('shape', 'circle')} className='h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full'>
                                </div>
                                <div onClick={() => createShape('shape', 'triangle')} style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} className='h-[90px] bg-[#3c3c3d] cursor-pointer'></div>
                            </div>
                        }

                        {
                            state === 'image' && <MyImages add_image={add_image} />
                        }

                        {
                            state === 'text' && <div>
                                <div className='grid grid-cols-1 gap-2'>
                                    <div onClick={() => add_text('text', 'title')} className='bg-[#3c3c3d] cursor-pointer font-bold p-3 text-white text-xl rounded-sm'>
                                        <h2>Add a Text</h2>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            state === 'project' && <Projects type='projects' designId={designId} />
                        }

                        {
                            state === 'initImage' && <div className='h-[90vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <InitialImage add_image={add_image} />
                            </div>
                        }

                        {
                            state === 'background' && <div className='h-[90vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
                                <BackgroundImages type='background' setImage={setImage} />
                            </div>
                        }

                        {
                            state === 'qrcode' && (
                                <div className="p-4 gap-5">
                                    <h2 className="text-white mb-2 justify-center items-center flex grid">Generate QR Code</h2>
                                    <input
                                        type="text"
                                        placeholder="Enter text or URL"
                                        className="w-full px-2 py-1 mb-3 rounded-md outline-none bg-gray-700 text-white"
                                        value={qrText}
                                        onChange={(e) => setQrText(e.target.value)}
                                    />
                                    <div className="flex justify-center mb-4">
                                        {qrText && <QRCodeCanvas value={qrText} size={180} />}
                                    </div>
                                    <button
                                        onClick={() => {
                                            const qrComponent = {
                                                id: Date.now(),
                                                name: 'qr',
                                                type: 'qr',
                                                left: 10,
                                                top: 10,
                                                opacity: 1,
                                                width: 150,
                                                height: 150,
                                                rotate,
                                                z_index: 3,
                                                text: qrText,
                                                setCurrentComponent: (a) => setCurrentComponent(a),
                                                moveElement,
                                                resizeElement,
                                                rotateElement
                                            }
                                            setComponents([...components, qrComponent])
                                            setShow({ name: "", status: true })
                                            setQrText("")
                                        }}
                                        className="w-full bg-purple-600 text-white py-2 rounded-sm"
                                    >
                                        Add to Design
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    <div className='w-full flex h-full'>
                        <div className={`flex justify-center relative items-center h-full ${!current_component ? 'w-full' : "w-[calc(100%-250px)] overflow-hidden"}`}>
                            <div className='m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden'>
                                <div id='main_design' className='w-auto relative h-auto overflow-hidden'>
                                    {
                                        components.map((c, i) => <CreateComponent key={i} info={c} current_component={current_component} removeComponent={removeComponent} />)
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            current_component && <div className='h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2'>
                                <div className='flex gap-6 flex-col items-start h-full px-3 justify-start pt-4'>
                                    <div className='flex gap-4 justify-start items-start mt-4'>
                                        <span>Color : </span>
                                        <label className='w-[30px] h-[30px] cursor-pointer rounded-sm' style={{ background: `${current_component.color && current_component.color !== '#fff' ? current_component.color : 'gray'}` }} htmlFor="color"></label>
                                        <input onChange={(e) => setColor(e.target.value)} type="color" className='invisible' id='color' />
                                    </div>
                                    {
                                        (current_component.name === 'main_frame' && current_component.image) && <div>
                                            <button className='p-[6px] bg-slate-700 text-white rounded-sm' onClick={remove_background}>Remove Background</button>
                                        </div>
                                    }

                                    {
                                        current_component.name !== 'main_frame' && <div className='flex gap-3 flex-col'>
                                            <div className='flex gap-6 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Opacity : </span>
                                                <input onChange={opacityHandle} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={0.1} min={0.1} max={1} value={current_component.opacity} />
                                            </div>
                                            <div className='flex gap-6 justify-start items-start'>
                                                <span className='text-md w-[70px]'>Z-Index : </span>
                                                <input onChange={(e) => setZIndex(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.z_index} />
                                            </div>
                                            {
                                                current_component.name === 'image' && <div className='flex gap-6 justify-start items-start'>
                                                    <span className='text-md w-[70px]'>Radius : </span>
                                                    <input onChange={(e) => setRadius(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.radius} />
                                                </div>
                                            }
                                            {
                                                current_component.name === 'text' && <>
                                                    <div className='flex gap-6 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Padding : </span>
                                                        <input onChange={(e) => setPadding(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.padding} />
                                                    </div>
                                                    <div className='flex gap-6 justify-start items-start'>
                                                        <span className='text-md w-[72px]'>Font Size : </span>
                                                        <input onChange={(e) => setFont(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={1} value={current_component.font} />
                                                    </div>
                                                    <div className='flex gap-6 justify-start items-start'>
                                                        <span className='text-md w-[70px]'>Weight : </span>
                                                        <input onChange={(e) => setWeight(parseInt(e.target.value))} className='w-[70px] border border-gray-700 bg-transparent outline-none px-2 rounded-md' type="number" step={100} min={100} max={900} value={current_component.weight} />
                                                    </div>

                                                    <div className='flex gap-2 flex-col justify-start items-start'>
                                                        <input onChange={(e) => setCurrentComponent({
                                                            ...current_component,
                                                            title: e.target.value
                                                        })} className='border border-gray-700 bg-transparent outline-none p-2 rounded-md' type="text" value={current_component.title} />
                                                        <button onClick={() => setText(current_component.title)} className='px-4 py-2 bg-purple-500 text-xs text-white rounded-sm'>Add</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Main
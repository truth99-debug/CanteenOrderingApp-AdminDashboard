import * as React from "react";
import {useEffect, useState} from "react";
import MealItemsService from "../../service/MealItemsService";
import {CssVarsProvider} from '@mui/joy/styles';
import CssBaseline from "@mui/joy/CssBaseline";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {useLocation} from "react-router-dom";
import Card from "@mui/joy/Card";
import Input from "@mui/joy/Input";
import mod from "../../../public/assets/motd.jpg"
import {CardActions, CardContent, Grid, styled} from "@mui/joy";
import Button from "@mui/joy/Button";
import {Col, Row} from "react-bootstrap";
import Sheet from "@mui/joy/Sheet";


const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : 'transparent',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));

const Home = (user: any) => {
    const location = useLocation();
    const [userObject, setUserObject] = useState({})
    const [mealItems, setMealItems] = useState([]);
    const [edit , setEdit] = useState(0);
    const [editMOD , setEditMOD] = useState(false);
    const [mealOfTheDay, setMealOfTheDay] = useState({
        id: 0,
        category: "",
        description: "",
        image: "",
        name: "",
        price: ""
    });
    const [annoncements, setAnnouncements] = useState([]);
    const [image , setImage] = useState({name : ""});
    const [name , setName] = useState("")
    const [description , setDescription]  = useState("");
    const [price , setPrice] = useState("");

    useEffect(() => {
        console.log("location", location?.state?.user?.user);
        setUserObject(location?.state?.user?.user);
    }, [location, user])

    useEffect(() => {
        MealItemsService.getMealItems().then((response) => {
            if (response.status === 200) {
                setMealItems(response.data)
            }
        }).catch((error) => {
            console.error("Something went Wrong", error)
        })
    }, [])

    useEffect(() => {
        MealItemsService.getMealOfTheDay().then((response) => {
            if (response.status === 200) {
                setMealOfTheDay(response.data)
            }
        }).catch((error) => {
            console.error("Something went Wrong ", error)
        })
    }, [])

    const handleToggleEdit = (value : boolean , id : number) => {
        console.log(id , value)
        setEdit(id)
    }

    const handleToggleCancel = (value : boolean , id : number) => {
        setEdit(0)
    }

    const handleToggleEditMOD = (value : boolean , id : number) => {
        console.log(id , value)
        setEditMOD(value)
    }

    const chooseHandler = (event : any) => {
        console.log("File" , event.target.files[0])
        setImage(event.target.files[0]);
    }

    const handleCancelImageUpload = () => {
        setImage({name : ""})
    }

    const handleInputMOD = (event : any) => {
        console.log("MOD" , event.target.value)
    }

    const handleInput = (event : any , data : any) => {
        console.log("Meal Item Input" , event.target.value)
        console.log("Meal Item OBJ" , data)
    }

    const handleInputName = (event : any) => {
        setName(event.target.value)
    }

    const handleInputDescription = (event : any) => {
        setDescription(event.target.value)
    }
    const handleInputPrice = (event : any) => {
        setPrice(event.target.value)
    }



    const handleSubmission = (event : any , data : any) => {
        console.log("handleSubmission" , event.target.value)
        let json = {
            id: data.id,
            category: data.category,
            description: description,
            image: data.image,
            name: name,
            price: price
        }

        console.log('JSON ={}' , json)

        MealItemsService.updateMealItem(json).then((response) => {
            if (response.status === 200){
                console.log(response.data)
            }
        }).catch((error) => {
            console.error(error)
        })
    }

    return (
        <CssVarsProvider disableTransitionOnChange>
            <CssBaseline/>
            <Box sx={{display: 'flex', minHeight: '100dvh'}} component={'section'}>
                <Header/>
                <Sidebar user={userObject}/>
                <Box
                    component="main"
                    className="MainContent"
                    sx={{
                        px: {xs: 2, md: 6},
                        pt: {
                            xs: 'calc(12px + var(--Header-height))',
                            sm: 'calc(12px + var(--Header-height))',
                            md: 3,
                        },
                        pb: {xs: 2, sm: 2, md: 3},
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                    }}>
                    <Box component={'section'}
                         sx={{
                             display: 'flex',
                             mb: 1,
                             gap: 1,
                             flexDirection: {xs: 'column', sm: 'row'},
                             alignItems: {xs: 'start', sm: 'center'},
                             flexWrap: 'wrap',
                             justifyContent: 'space-between',
                         }}>
                        <Typography level="h2" component="h1">
                            Home
                        </Typography>

                    </Box>
                    <>
                        <Grid container
                              rowSpacing={1}
                              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                              sx={{ width: '100%' }}>
                            <Grid xs={6}>
                                <Item>
                                    <Card
                                        color="success"
                                        invertedColors={true}
                                        orientation="vertical"
                                        size="lg"
                                        sx={{width: '100%', height: '81%'}}
                                        variant="soft">
                                        <div>
                                            <Typography level="title-lg" sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                fontSize: 'xx-large'
                                            }}>Meal Of The Day</Typography>
                                            <br/>
                                            {!editMOD &&
                                                <Typography level="body-sm"
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                fontSize: 'x-large'
                                                            }}>{mealOfTheDay?.name}</Typography>
                                            }
                                            <br/>
                                            {!editMOD &&
                                                <Typography level="body-sm"
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                fontSize: 'x-large'
                                                            }}>R {mealOfTheDay?.price}</Typography>
                                            }
                                            <br/>
                                            {editMOD &&
                                                <Input
                                                    color="warning"
                                                    disabled={false}
                                                    placeholder={mealOfTheDay?.price}
                                                    size="lg"
                                                    variant="soft"
                                                    onChange={handleInputMOD}
                                                />
                                            }
                                            <br/>
                                            {!editMOD &&
                                                <Typography level="body-sm"
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                fontSize: 'x-large'
                                                            }}>{mealOfTheDay?.description}</Typography>
                                            }
                                            <br/>
                                            {editMOD &&
                                                <Input
                                                    color="warning"
                                                    disabled={false}
                                                    placeholder={mealOfTheDay?.name}
                                                    size="lg"
                                                    variant="soft"
                                                    onChange={handleInputMOD}
                                                />
                                            }
                                            <br/>
                                            { !editMOD ?
                                                <img src={mod} alt='motd' style={{width: '75%', marginLeft: '14%', height: '68%'}}/>
                                                :
                                                <>
                                                    <div className={'imgUpload'}>
                                                        <div style={{position: 'relative'  ,display : 'flex' , justifyContent : 'center'}}>
                                                            <input
                                                                type="file"
                                                                accept="image/png, image/jpeg, image/jpg"
                                                                onChange={chooseHandler}
                                                                style={{display: 'none'}}
                                                                id='contained-button-file'
                                                                multiple={false}
                                                            />
                                                        </div>
                                                    </div>
                                                    <label htmlFor='contained-button-file'>
                                                        <Button variant="outlined" component="span" className={'upload-button'}>
                                                            <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                Choose
                                                            </Typography>
                                                        </Button>
                                                    </label>

                                                    {image?.name &&
                                                        <>
                                                            <Button variant="outlined" component="span" className={'upload-button'}>
                                                                <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                    Upload
                                                                </Typography>
                                                            </Button>
                                                            <Button variant="outlined" component="span" className={'upload-button'} onClick={handleCancelImageUpload}>
                                                                <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                    Cancel
                                                                </Typography>
                                                            </Button>
                                                            <br/>
                                                            <Typography level="body-sm"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center',
                                                                            fontSize: 'larger'
                                                                        }}>{image?.name}</Typography>
                                                        </>
                                                    }
                                                </>
                                            }
                                            <br/>
                                            <br/>
                                            <CardActions>
                                                {!editMOD &&
                                                    <Button
                                                        color="neutral"
                                                        loading={false}
                                                        onClick={() => {
                                                            handleToggleEditMOD(true , mealOfTheDay.id);
                                                        }}
                                                        size="lg"
                                                        variant="outlined"
                                                    >
                                                        Edit
                                                    </Button>
                                                }
                                                {editMOD &&
                                                    <>
                                                        <Button color="neutral"
                                                                loading={false}
                                                                onClick={(event) => {
                                                                    handleSubmission(event , mealOfTheDay)
                                                                }}
                                                                size="lg"
                                                                variant="outlined">
                                                            Submit
                                                        </Button>
                                                        <Button color="neutral"
                                                                loading={false}
                                                                onClick={() => {
                                                                    handleToggleEditMOD(false , mealOfTheDay.id)
                                                                }}
                                                                size="lg"
                                                                variant="outlined">
                                                            Cancel
                                                        </Button>
                                                    </>
                                                }
                                            </CardActions>
                                        </div>
                                    </Card>
                                </Item>
                            </Grid>
                            <Grid xs={6}>
                                <Item>
                                    {mealItems?.map((data : any) => {
                                        return(
                                            <>
                                                <Card
                                                    color="success"
                                                    invertedColors={true}
                                                    orientation="vertical"
                                                    size="lg"
                                                    sx={{width: '100%', height: '81%'}}
                                                    variant="soft">
                                                    <div>
                                                        <Typography level="title-lg" sx={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'center',
                                                            fontSize: 'xx-large'
                                                        }}>{data?.category}</Typography>
                                                        <br/>
                                                        {!edit &&
                                                            <Typography level="body-sm"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center',
                                                                            fontSize: 'x-large'
                                                                        }}>{data?.name}</Typography>
                                                        }
                                                        {edit === data.id &&
                                                            <>
                                                                <Input
                                                                    color="warning"
                                                                    disabled={false}
                                                                    placeholder={data?.name}
                                                                    size="lg"
                                                                    variant="soft"
                                                                    onChange={(e) => {
                                                                        handleInputName(e)
                                                                    }}
                                                                /><br/>
                                                            </>
                                                        }
                                                        {!edit &&
                                                            <Typography level="body-sm"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center',
                                                                            fontSize: 'x-large'
                                                                        }}>R {data?.price}</Typography>
                                                        }
                                                        <br/>
                                                        {edit === data.id &&
                                                            <>
                                                                <Input
                                                                    color="warning"
                                                                    disabled={false}
                                                                    placeholder={data?.price}
                                                                    size="lg"
                                                                    variant="soft"
                                                                    onChange={(e) => {
                                                                        handleInputPrice(e)
                                                                    }}
                                                                /><br/>
                                                            </>
                                                        }

                                                        {!edit &&
                                                            <Typography level="body-sm"
                                                                        sx={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'center',
                                                                            fontSize: 'x-large'
                                                                        }}>{data?.description}</Typography>
                                                        }

                                                        {edit === data.id &&
                                                            <Input
                                                                color="warning"
                                                                disabled={false}
                                                                placeholder={data?.description}
                                                                size="lg"
                                                                variant="soft"
                                                                onChange={(e) => {
                                                                    handleInputDescription(e)
                                                                }}
                                                            />
                                                        }
                                                        <br/>
                                                        { !edit  ?
                                                            <img src={mod} alt='motd' style={{width: '75%', marginLeft: '14%', height: '68%'}}/>
                                                            :
                                                            <>
                                                                <div className={'imgUpload'}>
                                                                    <div style={{position: 'relative'  ,display : 'flex' , justifyContent : 'center'}}>
                                                                        <input
                                                                            type="file"
                                                                            accept="image/png, image/jpeg, image/jpg"
                                                                            onChange={chooseHandler}
                                                                            style={{display: 'none'}}
                                                                            id='contained-button-file'
                                                                            multiple={false}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <label htmlFor='contained-button-file'>
                                                                    <Button variant="outlined" component="span" className={'upload-button'}>
                                                                        <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                            Choose
                                                                        </Typography>
                                                                    </Button>
                                                                </label>

                                                                {image?.name &&
                                                                    <>
                                                                        <Button variant="outlined" component="span" className={'upload-button'}>
                                                                            <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                                Upload
                                                                            </Typography>
                                                                        </Button>
                                                                        <Button variant="outlined" component="span" className={'upload-button'} onClick={handleCancelImageUpload}>
                                                                            <Typography style={{fontSize: 'smaller', fontWeight: 'bold'}}>
                                                                                Cancel
                                                                            </Typography>
                                                                        </Button>
                                                                        <br/>
                                                                        <Typography level="body-sm"
                                                                                    sx={{
                                                                                        display: 'flex',
                                                                                        flexDirection: 'column',
                                                                                        alignItems: 'center',
                                                                                        fontSize: 'larger'
                                                                                    }}>{image?.name}</Typography>
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                        <br/>
                                                        <br/>
                                                        <CardActions>
                                                            {!edit &&
                                                                <Button
                                                                    color="neutral"
                                                                    loading={false}
                                                                    onClick={() => {
                                                                        handleToggleEdit(true , data.id);
                                                                    }}
                                                                    size="lg"
                                                                    variant="outlined"
                                                                >
                                                                    Edit
                                                                </Button>
                                                            }
                                                            {edit === data.id &&
                                                                <>
                                                                    <Button color="neutral"
                                                                            loading={false}
                                                                            onClick={(event) => {
                                                                                handleSubmission(event , data)
                                                                            }}
                                                                            size="lg"
                                                                            variant="outlined">
                                                                        Submit
                                                                    </Button>
                                                                    <Button color="neutral"
                                                                            loading={false}
                                                                            onClick={() => {
                                                                                handleToggleCancel(false , data.id)
                                                                            }}
                                                                            size="lg"
                                                                            variant="outlined">
                                                                        Cancel
                                                                    </Button>
                                                                </>
                                                            }
                                                        </CardActions>
                                                    </div>
                                                </Card>
                                                <br/>
                                            </>
                                        )
                                    })}
                                </Item>
                            </Grid>
                        </Grid>
                    </>
                </Box>
            </Box>
        </CssVarsProvider>
    )
}

export default Home

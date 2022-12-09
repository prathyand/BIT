import { CRow, CCol, CWidgetStatsA, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';
import { CChart, CChartBar } from '@coreui/react-chartjs';
import '@coreui/coreui/dist/css/coreui.min.css'
import CIcon from '@coreui/icons-react';
import { freeSet } from '@coreui/icons';
import AuthContext from '../contexts/AuthContext';
// import Request from '../contexts/Request';
import { useRef, useState, useContext } from 'react';
import { Alert } from "react-bootstrap";
import classes from '../components/Auth/AuthForm.module.css';
import background from "./theat.jpg";

const LoginPage = () => {
    const username = useRef()
    const passwordInp = useRef()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const authContext = useContext(AuthContext)
    // const request = useContext(Request)
    // const isLoggedIn = authContext.isLoggedIn

    const formSubmitted = (event) => {
        event.preventDefault()
        // let data = {
        //     cellphone_no: username.current.value,
        //     password: passwordInp.current.value,
        //     isAdmin: true
        // }
        if(username.current.value === "admin"){
            authContext.login("Abcd")
            setSuccess("Success")
        }else{
            setError("Failed")
        }
        
        // let loginAuth = request.postRequest(constants.REQUEST.EMAIL_LOGIN_EP,data);
        // loginAuth.then(response => {
        //     if(response.ok){
        //         response.json().then((data)=>{
        //             setSuccess("Signin Successful")
        //             authContext.login(data.token)
        //         })
        //     }else{
        //         console.log(response)
        //         response.json().then((err)=>{
        //             setError(err.message)
        //         })
        //     }
        // })
    }
    return (
            <section className={classes.auth}>
            <h1 className={classes.login}>Login</h1>
            { error && <h3><Alert variant="danger">{error}</Alert></h3>}
            { success && 
                <h2>
                    <Alert variant='success'>
                        {success}
                    </Alert>
                </h2> 
            }
            <form onSubmit={formSubmitted.bind(this)}>
                <div className={classes.control}>
                    {/* <label htmlFor='username'>Username</label> */}
                    <input type='text' id='username' required  placeholder="Username" ref={username}/>
                </div>
                <div className={classes.control}>
                    {/* <label htmlFor='password'>Your Password</label> */}
                    <input type='password' id='password' placeholder="Your Password" required ref={passwordInp}/>
                </div>
                <div className={classes.actions}>
                <button style={{ borderRadius: "45px", border: "5px solid black" }}>Login</button>
                </div>
            </form>
            </section>
    )
}


const AdminPage = () => {
    const chartData = {
        userCount: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            data:[1, 18, 9, 17, 34, 22, 11],
            title:"User Count"
        },
        transactions: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            data:[2, 36, 18, 34, 68, 44, 22],
            title:"Transactions"
        },
        profit: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            data:[3, 54, 37, 51, 102, 66, 33],
            title:"Profit"
        },
        numShows: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            data:[1, 18, 9, 17, 34, 22, 11],
            title:"Num of Shows"
        },
        numTheaters: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            data:[10, 18, 19, 27, 34, 42, 48],
            title:"Num of Theaters"
        } 
    }
    const authContext = useContext(AuthContext)
    const isLoggedIn = authContext.isLoggedIn
    const widgets = [
        {
            id: "userCount",
            value: "1000",
            percentage: "20%",
            title:"User Count",
            options:["expand"],
            chart: chartData["userCount"]
        },
        {
            id:"transactions",
            value: "2000",
            percentage: "30%",
            title:"Trannsactions",
            options:["expand"],
            chart: chartData["transactions"]
        },
        {
            id:"profit",
            value: "$3000",
            percentage: "40%",
            title:"Profit",
            options:["expand"],
            chart: chartData["profit"]
        },
        {
            id:"numShows",
            value: "5000",
            percentage: "50%",
            title:"No of Shows",
            options:["expand"],
            chart: chartData["numShows"]
        },
        {
            id:"numTheaters",
            value: "500",
            percentage: "50%",
            title:"No of Theaters",
            options:["expand"],
            chart: chartData["numTheaters"]
        }   
    ]
    const [mainChart,setMainChart] = useState("profit")

    const handleWidgetOptions = (event,option,chart) => {
        event.preventDefault()
        if(option === "expand"){
            setMainChart(chart)
        }
    }

    return (
        <>
            {!isLoggedIn && 
            <div className={classes.bg}>
                <div
                style={{ backgroundImage: `url(${background})` }}
                className={classes.bgimg}>
              <LoginPage/>
                </div>
            </div>}
            {isLoggedIn && 
                <>
                    <div style={{backgroundColor:"#ebedef", paddingTop:"20px"}}>
                    {/* <p>Admin Page</p> */}
                    <div>
                        <CRow>
                            {widgets.map((widget) => (
                                <CCol sm={2}>
                                    <CWidgetStatsA
                                    className="mb-4"
                                    color="info"
                                    value={
                                        <>
                                        {widget.value}{' '}
                                        <span className="fs-6 fw-normal">
                                            ({widget.percentage} <CIcon icon={freeSet.cilArrowTop} />)
                                        </span>
                                        </>
                                    }
                                    title={widget.title}
                                    action={
                                        <CDropdown alignment="end">
                                        <CDropdownToggle color="transparent" caret={false} className="p-0">
                                            <CIcon icon={freeSet.cilOptions} className="text-high-emphasis-inverse" />
                                        </CDropdownToggle>
                                        <CDropdownMenu>
                                            {widget.options.map((option) => (
                                                <CDropdownItem onClick={(event) => handleWidgetOptions(event,option,widget.id)}>{option}</CDropdownItem>
                                            ))}
                                        </CDropdownMenu>
                                        </CDropdown>
                                    }
                                    chart={
                                        <CChartBar
                                        className="mt-3 mx-3"
                                        style={{ height: '70px' }}
                                        data={{
                                            labels: widget.chart.labels,
                                            datasets: [
                                            {
                                                label: widget.chart.title,
                                                backgroundColor: 'rgba(255,255,255,.2)',
                                                borderColor: 'rgba(255,255,255,.55)',
                                                data: widget.chart.data,
                                                barPercentage: 0.6,
                                            },
                                            ],
                                        }}
                                        options={{
                                            maintainAspectRatio: false,
                                            plugins: {
                                            legend: {
                                                display: false,
                                            },
                                            },
                                            scales: {
                                            x: {
                                                grid: {
                                                display: false,
                                                drawTicks: false,
                                                },
                                                ticks: {
                                                display: false,
                                                },
                                            },
                                            y: {
                                                grid: {
                                                display: false,
                                                drawBorder: false,
                                                drawTicks: false,
                                                },
                                                ticks: {
                                                display: false,
                                                },
                                            },
                                            },
                                        }}
                                        />
                                    }
                                    />
                                </CCol>
                            ))}
                        </CRow>
                    </div>
                    <div>
                    <CChart
                        type="bar"
                        height = {115}
                        data={{
                            labels: chartData[mainChart].labels,
                            datasets: [
                            {
                                label: chartData[mainChart].title,
                                backgroundColor: '#f87979',
                                data: chartData[mainChart].data,
                            },
                            ],
                        }}
                        labels="months"
                    />
                    </div>
                    </div>                    
                </>
        }
        </>
    );
};

export default AdminPage;
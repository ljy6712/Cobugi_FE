import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Edit } from "iconsax-react";
import { useNavigate, Link } from "react-router-dom";
import { Message, ProfileCircle } from "iconsax-react";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function PrimarySearchAppBar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const auth = getAuth();

    const buttonStyle = {
        width: "140px",
        height: "40px",
        borderRadius: "10px",
        backgroundColor: "#ECF1FF",
        color: "#4470E1",
        fontWeight: "bold",
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = () => {
        const auth = getAuth();

        //로그아웃
        signOut(auth)
            .then(() => {
                console.log("User signed out");
                localStorage.removeItem("currentUser");
            })
            .catch((error) => {
                console.error("Error during logout", error);
            });
    };

    const handleChatButtonClick = () => {
        // 현재 로그인한 사용자 가져오기
        const currentUser = auth.currentUser;

        if (currentUser) {
            // 사용자가 로그인되어 있으면 대화하기 기능 수행
        } else {
            // 사용자가 로그인되어 있지 않으면 다이얼로그 표시 및 로그인 창으로 이동
            alert("로그인이 필요한 서비스입니다. 로그인 페이지로 이동합니다.");
            // 로그인 페이지로 이동하는 코드를 추가
            navigate("/signin");
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box position="static" color="">
                <Toolbar>
                    <Link to="/">
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                display: { xs: "none", sm: "block" },
                                marginBottom: "20px",
                                marginTop: "20px",
                            }}
                        >
                            <img
                                alt="logo"
                                src="/anabada_logo.jpg"
                                width="90px"
                                height="50px"
                            ></img>
                        </Typography>
                    </Link>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 1 }} />
                    <div style={{ marginRight: "20px" }}>
                        <Button
                            variant="contained"
                            style={buttonStyle}
                            onClick={handleChatButtonClick}
                        >
                            <span style={{ marginRight: 12 + "px" }}>
                                물품등록
                            </span>
                            <Edit color="#4470E1" variant="Linear" size={30} />
                        </Button>
                    </div>

                    {!user ? (
                        <>
                            <Button
                                variant="text"
                                sx={{ fontWeight: "bold", color: "#333333" }}
                                onClick={() => {
                                    navigate("/signin");
                                }}
                            >
                                로그인
                            </Button>
                            <Button
                                variant="text"
                                sx={{ fontWeight: "bold", color: "#333333" }}
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                회원가입
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="text"
                                sx={{ fontWeight: "bold", color: "#333333" }}
                                onClick={() => {
                                    handleLogout();
                                    navigate("/");
                                }}
                            >
                                로그아웃
                            </Button>
                            <IconButton
                                onClick={() => {
                                    navigate("/chat");
                                }}
                            >
                                <Message
                                    size="40"
                                    color="#67788d"
                                    variant="Bold"
                                />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    navigate("/mypage");
                                }}
                            >
                                <ProfileCircle
                                    size="40"
                                    color="#67788d"
                                    variant="Bulk"
                                />
                            </IconButton>
                        </>
                    )}
                </Toolbar>
            </Box>
        </Box>
    );
}

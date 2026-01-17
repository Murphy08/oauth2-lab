#!/bin/bash

# OAuth 2.0 Lab - Environment Check Script
# 检查所有必需的开发环境

echo "=================================="
echo "OAuth 2.0 Lab - Environment Check"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_command() {
    if command -v $1 &> /dev/null; then
        version=$($2)
        echo -e "${GREEN}✓${NC} $1: $version"
        return 0
    else
        echo -e "${RED}✗${NC} $1: Not installed"
        return 1
    fi
}

# Check Docker
echo "Checking Docker..."
check_command "docker" "docker --version"
check_command "docker-compose" "docker-compose --version"
echo ""

# Check Node.js
echo "Checking Node.js..."
check_command "node" "node --version"
check_command "npm" "npm --version"
echo ""

# Check Java
echo "Checking Java..."
check_command "java" "java -version 2>&1 | head -n 1"
check_command "javac" "javac -version 2>&1"
echo ""

# Check Python
echo "Checking Python..."
check_command "python3" "python3 --version"
check_command "pip3" "pip3 --version"
echo ""

# Check PHP
echo "Checking PHP..."
check_command "php" "php --version | head -n 1"
check_command "composer" "composer --version"
echo ""

# Check Go
echo "Checking Go..."
check_command "go" "go version"
echo ""

# Check Git
echo "Checking Git..."
check_command "git" "git --version"
echo ""

echo "=================================="
echo "Environment check completed!"
echo "=================================="
